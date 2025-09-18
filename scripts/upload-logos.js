const fs = require('fs');
const path = require('path');

// Configuration
const API_URL = 'http://localhost:3001/api/upload-optimized';
const LOGOS = [
  { 
    filename: 'logo-hagnere-elite-light.png',
    description: 'Logo Hagnéré Patrimoine Elite - Version claire'
  },
  {
    filename: 'logo-hagnere-elite-ldark.png',
    description: 'Logo Hagnéré Patrimoine Elite - Version sombre'
  },
  {
    filename: 'logo-patrimoine-black-.png', 
    description: 'Logo Patrimoine - Version noire sur fond transparent'
  },
  {
    filename: 'logo-hagnere-patrimoine-white.png',
    description: 'Logo Hagnéré Patrimoine - Version blanche sur fond noir'
  }
];

async function uploadLogo(filepath, filename) {
  try {
    const file = fs.readFileSync(filepath);
    const blob = new Blob([file], { type: 'image/png' });
    
    const formData = new FormData();
    formData.append('file', blob, filename);
    
    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`Erreur lors de l'upload de ${filename}:`, error);
    throw error;
  }
}

async function uploadAllLogos() {
  console.log('🚀 Début de l\'upload des logos sur S3...\n');
  
  const results = [];
  
  for (const logo of LOGOS) {
    const filepath = path.join(__dirname, '..', 'public', 'logos', logo.filename);
    
    // Vérifier que le fichier existe
    if (!fs.existsSync(filepath)) {
      console.error(`❌ Fichier non trouvé: ${filepath}`);
      console.log(`   Veuillez placer l'image ${logo.filename} dans le dossier public/logos/\n`);
      continue;
    }
    
    console.log(`📤 Upload de ${logo.filename}...`);
    console.log(`   ${logo.description}`);
    
    try {
      const result = await uploadLogo(filepath, logo.filename);
      results.push({
        filename: logo.filename,
        url: result.url,
        description: logo.description
      });
      console.log(`✅ Upload réussi: ${result.url}\n`);
    } catch (error) {
      console.error(`❌ Échec de l'upload\n`);
    }
  }
  
  // Sauvegarder les URLs dans un fichier JSON
  if (results.length > 0) {
    const outputPath = path.join(__dirname, '..', 'public', 'logos', 'uploaded-urls.json');
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
    console.log('\n📝 URLs sauvegardées dans public/logos/uploaded-urls.json');
  }
  
  console.log('\n✨ Upload terminé!');
  console.log(`   ${results.length}/${LOGOS.length} fichiers uploadés avec succès`);
  
  // Afficher un récapitulatif
  if (results.length > 0) {
    console.log('\n📋 Récapitulatif des URLs S3:');
    results.forEach(r => {
      console.log(`\n   ${r.description}:`);
      console.log(`   ${r.url}`);
    });
  }
}

// Note: Ce script nécessite Node.js 18+ pour FormData et fetch natifs
console.log('====================================');
console.log('   Upload des Logos sur AWS S3     ');
console.log('====================================\n');

console.log('⚠️  IMPORTANT: Assurez-vous que:');
console.log('   1. Le serveur Next.js est en cours d\'exécution (npm run dev)');
console.log('   2. Les variables d\'environnement AWS sont configurées');
console.log('   3. Les images sont placées dans public/logos/\n');

console.log('Pour exécuter ce script:');
console.log('   node scripts/upload-logos.js\n');

// Si le script est exécuté directement
if (require.main === module) {
  // Vérifier la version de Node.js
  const nodeVersion = process.versions.node.split('.')[0];
  if (parseInt(nodeVersion) < 18) {
    console.error('❌ Ce script nécessite Node.js 18 ou supérieur');
    console.error(`   Version actuelle: ${process.version}`);
    process.exit(1);
  }
  
  uploadAllLogos().catch(console.error);
}

module.exports = { uploadAllLogos };
