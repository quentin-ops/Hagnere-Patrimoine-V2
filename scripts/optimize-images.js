#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

// Configuration d'optimisation
const OPTIMIZATION_PRESETS = {
  logo: {
    formats: ['webp', 'png'],
    sizes: [400, 200, 100],
    quality: 95,
    maxWidth: 400,
    maxHeight: 400
  },
  hero: {
    formats: ['webp', 'avif'],
    sizes: [2560, 1920, 1280, 768],
    quality: 90,
    maxWidth: 2560,
    maxHeight: 1440
  },
  content: {
    formats: ['webp', 'avif'],
    sizes: [1920, 1280, 768, 400],
    quality: 85,
    maxWidth: 1920,
    maxHeight: 1080
  },
  thumbnail: {
    formats: ['webp'],
    sizes: [400, 200],
    quality: 80,
    maxWidth: 400,
    maxHeight: 400
  }
};

// Couleurs pour le terminal
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

/**
 * Afficher un message coloré
 */
function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Formater la taille de fichier
 */
function formatSize(bytes) {
  const kb = bytes / 1024;
  if (kb < 1024) {
    return `${kb.toFixed(1)} KB`;
  }
  return `${(kb / 1024).toFixed(2)} MB`;
}

/**
 * Analyser une image
 */
async function analyzeImage(filePath) {
  const buffer = await fs.readFile(filePath);
  const metadata = await sharp(buffer).metadata();
  const stats = await fs.stat(filePath);
  
  return {
    buffer,
    metadata,
    size: stats.size,
    filename: path.basename(filePath)
  };
}

/**
 * Optimiser une image
 */
async function optimizeImage(buffer, options, outputDir, baseName) {
  const results = [];
  const metadata = await sharp(buffer).metadata();
  
  for (const format of options.formats) {
    for (const size of options.sizes) {
      // Ne pas agrandir l'image
      if (size > metadata.width) continue;
      
      const aspectRatio = metadata.width / metadata.height;
      const height = Math.round(size / aspectRatio);
      
      try {
        let pipeline = sharp(buffer)
          .resize(size, height, {
            fit: 'inside',
            withoutEnlargement: true,
            kernel: sharp.kernel.lanczos3
          });
        
        // Configuration selon le format
        switch (format) {
          case 'webp':
            pipeline = pipeline.webp({
              quality: options.quality,
              effort: 6,
              smartSubsample: true
            });
            break;
          case 'avif':
            pipeline = pipeline.avif({
              quality: options.quality,
              effort: 9,
              chromaSubsampling: '4:2:0'
            });
            break;
          case 'png':
            pipeline = pipeline.png({
              quality: options.quality,
              compressionLevel: 9,
              adaptiveFiltering: true,
              palette: true
            });
            break;
          case 'jpg':
          case 'jpeg':
            pipeline = pipeline.jpeg({
              quality: options.quality,
              progressive: true,
              mozjpeg: true,
              chromaSubsampling: '4:2:0',
              trellisQuantisation: true,
              overshootDeringing: true,
              optimiseScans: true
            });
            break;
        }
        
        // Supprimer les métadonnées et forcer sRGB
        pipeline = pipeline.withMetadata({
          exif: {},
          icc: 'sRGB',
          iptc: {},
          xmp: {}
        });
        
        const outputBuffer = await pipeline.toBuffer();
        const outputFilename = `${baseName}-${size}w.${format}`;
        const outputPath = path.join(outputDir, outputFilename);
        
        await fs.writeFile(outputPath, outputBuffer);
        
        results.push({
          filename: outputFilename,
          format,
          width: size,
          height,
          size: outputBuffer.length,
          path: outputPath
        });
        
      } catch (error) {
        log(`  ❌ Erreur pour ${format} ${size}px: ${error.message}`, 'red');
      }
    }
  }
  
  return results;
}

/**
 * Traiter un dossier d'images
 */
async function processDirectory(inputDir, outputDir, preset = 'content') {
  const options = OPTIMIZATION_PRESETS[preset];
  
  if (!options) {
    log(`❌ Preset invalide: ${preset}`, 'red');
    log(`   Presets disponibles: ${Object.keys(OPTIMIZATION_PRESETS).join(', ')}`, 'dim');
    return;
  }
  
  // Créer le dossier de sortie
  await fs.mkdir(outputDir, { recursive: true });
  
  // Lister les images
  const files = await fs.readdir(inputDir);
  const imageFiles = files.filter(f => 
    /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(f)
  );
  
  if (imageFiles.length === 0) {
    log('❌ Aucune image trouvée dans le dossier', 'red');
    return;
  }
  
  log(`\n🖼️  Optimisation de ${imageFiles.length} image(s) avec le preset "${preset}"`, 'bright');
  log(`📁 Dossier source: ${inputDir}`, 'dim');
  log(`📁 Dossier destination: ${outputDir}`, 'dim');
  log('');
  
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  let totalVariants = 0;
  
  for (const file of imageFiles) {
    const filePath = path.join(inputDir, file);
    const baseName = path.basename(file, path.extname(file));
    
    log(`📸 ${file}`, 'cyan');
    
    try {
      // Analyser l'image
      const { buffer, metadata, size } = await analyzeImage(filePath);
      totalOriginalSize += size;
      
      log(`   Format: ${metadata.format}, Dimensions: ${metadata.width}x${metadata.height}`, 'dim');
      log(`   Taille originale: ${formatSize(size)}`, 'dim');
      
      // Optimiser
      const results = await optimizeImage(buffer, options, outputDir, baseName);
      
      if (results.length > 0) {
        const bestSize = Math.min(...results.map(r => r.size));
        const savings = ((size - bestSize) / size * 100).toFixed(1);
        
        totalOptimizedSize += results.reduce((sum, r) => sum + r.size, 0) / results.length;
        totalVariants += results.length;
        
        log(`   ✅ ${results.length} variante(s) créée(s)`, 'green');
        log(`   📉 Meilleure compression: ${formatSize(bestSize)} (-${savings}%)`, 'green');
        
        // Afficher les détails si verbose
        if (process.argv.includes('--verbose')) {
          results.forEach(r => {
            log(`      • ${r.filename}: ${formatSize(r.size)}`, 'dim');
          });
        }
      } else {
        log(`   ⚠️  Aucune optimisation possible`, 'yellow');
      }
      
    } catch (error) {
      log(`   ❌ Erreur: ${error.message}`, 'red');
    }
    
    log('');
  }
  
  // Résumé
  const totalSavings = ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1);
  
  log('═══════════════════════════════════════', 'bright');
  log('📊 Résumé de l\'optimisation', 'bright');
  log('═══════════════════════════════════════', 'bright');
  log(`Images traitées: ${imageFiles.length}`, 'cyan');
  log(`Variantes créées: ${totalVariants}`, 'cyan');
  log(`Taille originale totale: ${formatSize(totalOriginalSize)}`, 'yellow');
  log(`Taille optimisée moyenne: ${formatSize(totalOptimizedSize)}`, 'green');
  log(`Économies moyennes: ${totalSavings}%`, 'green');
  log('');
}

/**
 * Optimiser une seule image
 */
async function processSingleImage(inputPath, outputDir, preset = 'content') {
  const options = OPTIMIZATION_PRESETS[preset];
  
  if (!options) {
    log(`❌ Preset invalide: ${preset}`, 'red');
    log(`   Presets disponibles: ${Object.keys(OPTIMIZATION_PRESETS).join(', ')}`, 'dim');
    return;
  }
  
  // Créer le dossier de sortie
  await fs.mkdir(outputDir, { recursive: true });
  
  const baseName = path.basename(inputPath, path.extname(inputPath));
  
  log(`\n🖼️  Optimisation de "${path.basename(inputPath)}" avec le preset "${preset}"`, 'bright');
  log('');
  
  try {
    // Analyser l'image
    const { buffer, metadata, size } = await analyzeImage(inputPath);
    
    log(`📊 Analyse de l'image:`, 'cyan');
    log(`   Format: ${metadata.format}`, 'dim');
    log(`   Dimensions: ${metadata.width}x${metadata.height}`, 'dim');
    log(`   Taille: ${formatSize(size)}`, 'dim');
    log('');
    
    // Recommandations
    const recommendations = [];
    if (metadata.width > 1920) {
      recommendations.push(`Réduire la largeur de ${metadata.width}px à 1920px`);
    }
    if (metadata.format !== 'webp' && metadata.format !== 'avif') {
      recommendations.push(`Convertir en WebP ou AVIF pour une meilleure compression`);
    }
    if (size > 500 * 1024) {
      recommendations.push(`Taille élevée (${formatSize(size)}), optimisation recommandée`);
    }
    
    if (recommendations.length > 0) {
      log('💡 Recommandations:', 'yellow');
      recommendations.forEach(r => log(`   • ${r}`, 'dim'));
      log('');
    }
    
    // Optimiser
    log('🔧 Optimisation en cours...', 'cyan');
    const results = await optimizeImage(buffer, options, outputDir, baseName);
    
    if (results.length > 0) {
      const bestSize = Math.min(...results.map(r => r.size));
      const savings = ((size - bestSize) / size * 100).toFixed(1);
      
      log('');
      log(`✅ Optimisation terminée!`, 'green');
      log(`   Variantes créées: ${results.length}`, 'green');
      log(`   Meilleure taille: ${formatSize(bestSize)} (-${savings}%)`, 'green');
      log('');
      
      log('📁 Fichiers générés:', 'cyan');
      results.forEach(r => {
        const savings = ((size - r.size) / size * 100).toFixed(1);
        log(`   • ${r.filename}`, 'bright');
        log(`     ${r.format.toUpperCase()} ${r.width}x${r.height} | ${formatSize(r.size)} (-${savings}%)`, 'dim');
      });
    } else {
      log(`⚠️  Aucune optimisation possible`, 'yellow');
    }
    
  } catch (error) {
    log(`❌ Erreur: ${error.message}`, 'red');
  }
  
  log('');
}

/**
 * Afficher l'aide
 */
function showHelp() {
  log('\n📸 Optimiseur d\'images - Hagnéré Patrimoine', 'bright');
  log('═══════════════════════════════════════════', 'dim');
  log('');
  log('Usage:', 'cyan');
  log('  node optimize-images.js <input> [output] [preset]', 'bright');
  log('');
  log('Arguments:', 'cyan');
  log('  input   Fichier ou dossier source');
  log('  output  Dossier de destination (défaut: ./optimized)');
  log('  preset  Type d\'optimisation (défaut: content)');
  log('');
  log('Presets disponibles:', 'cyan');
  log('  logo      Logos (400px max, WebP+PNG, qualité 95%)');
  log('  hero      Images hero (2560px max, WebP+AVIF, qualité 90%)');
  log('  content   Contenu général (1920px max, WebP+AVIF, qualité 85%)');
  log('  thumbnail Vignettes (400px max, WebP, qualité 80%)');
  log('');
  log('Options:', 'cyan');
  log('  --verbose  Afficher les détails de chaque variante');
  log('  --help     Afficher cette aide');
  log('');
  log('Exemples:', 'cyan');
  log('  node optimize-images.js image.jpg', 'dim');
  log('  node optimize-images.js ./images ./optimized content', 'dim');
  log('  node optimize-images.js logo.png ./logos logo --verbose', 'dim');
  log('');
}

/**
 * Main
 */
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args.includes('--help')) {
    showHelp();
    return;
  }
  
  const input = args[0];
  const output = args[1] || './optimized';
  const preset = args[2] || 'content';
  
  try {
    const stats = await fs.stat(input);
    
    if (stats.isDirectory()) {
      await processDirectory(input, output, preset);
    } else {
      await processSingleImage(input, output, preset);
    }
    
  } catch (error) {
    log(`❌ Erreur: ${error.message}`, 'red');
    if (error.code === 'ENOENT') {
      log(`   Le fichier ou dossier "${input}" n'existe pas`, 'dim');
    }
  }
}

// Exécuter
main().catch(console.error);
