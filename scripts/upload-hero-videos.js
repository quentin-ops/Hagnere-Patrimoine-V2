const fs = require('fs');
const path = require('path');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config({ path: '.env.local' });

// Configuration AWS S3
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'eu-north-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'AKIA2NX46MXORQJECK4I',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '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',
  },
});

const BUCKET_NAME = process.env.AWS_BUCKET_NAME || process.env.AWS_S3_BUCKET_NAME || 'hagnerepatrimoine';

// Configuration des vidéos
const VIDEOS = [
  { filename: 'hero3.webm', description: 'Vidéo Hero 3 - WebM (Mode Light Desktop)' },
  { filename: 'hero3_h264.mp4', description: 'Vidéo Hero 3 - MP4 (Mode Light Desktop)' },
  { filename: 'hero3_poster.jpg', description: 'Poster Hero 3 (Mode Light Desktop)' },
  { filename: 'hero4.webm', description: 'Vidéo Hero 4 - WebM (Mode Dark Desktop)' },
  { filename: 'hero4_h264.mp4', description: 'Vidéo Hero 4 - MP4 (Mode Dark Desktop)' },
  { filename: 'hero4_poster.jpg', description: 'Poster Hero 4 (Mode Dark Desktop)' },
  { filename: 'hero1.webm', description: 'Vidéo Hero 1 - WebM (Desktop Fallback)' },
  { filename: 'hero1_h264.mp4', description: 'Vidéo Hero 1 - MP4 (Desktop Fallback)' },
  { filename: 'hero1_poster.jpg', description: 'Poster Hero 1 (Desktop Fallback)' },
  { filename: 'hero2.webm', description: 'Vidéo Hero 2 - WebM (Mobile)' },
  { filename: 'hero2_h264.mp4', description: 'Vidéo Hero 2 - MP4 (Mobile)' },
  { filename: 'hero2_poster.jpg', description: 'Poster Hero 2 (Mobile)' },
];

// Fonction pour obtenir le content type
function getContentType(filename) {
  const ext = path.extname(filename).toLowerCase();
  switch (ext) {
    case '.webm':
      return 'video/webm';
    case '.mp4':
      return 'video/mp4';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    default:
      return 'application/octet-stream';
  }
}

async function uploadToS3(filepath, filename) {
  try {
    const fileContent = fs.readFileSync(filepath);
    const contentType = getContentType(filename);
    const key = `videos/hero/${filename}`;
    
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: fileContent,
      ContentType: contentType,
      CacheControl: 'public, max-age=31536000' // Cache 1 an
      // ACL n'est plus supporté sur les buckets modernes
    });
    
    await s3Client.send(command);
    
    // Retourner l'URL publique
    return `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION || 'eu-north-1'}.amazonaws.com/${key}`;
  } catch (error) {
    console.error(`Erreur lors de l'upload de ${filename}:`, error);
    throw error;
  }
}

async function uploadAllVideos() {
  console.log('🚀 Début de l\'upload des vidéos Hero sur S3...\n');
  console.log(`📦 Bucket S3: ${BUCKET_NAME}`);
  console.log(`🌍 Région: ${process.env.AWS_REGION || 'eu-north-1'}\n`);
  
  const results = [];
  const errors = [];
  
  for (const video of VIDEOS) {
    const filepath = path.join(__dirname, '..', 'public', video.filename);
    
    // Vérifier que le fichier existe
    if (!fs.existsSync(filepath)) {
      console.error(`⚠️  Fichier non trouvé: ${video.filename}`);
      errors.push(video.filename);
      continue;
    }
    
    const fileSize = fs.statSync(filepath).size / (1024 * 1024); // Taille en MB
    console.log(`📤 Upload de ${video.filename} (${fileSize.toFixed(2)} MB)...`);
    console.log(`   ${video.description}`);
    
    try {
      const url = await uploadToS3(filepath, video.filename);
      results.push({
        filename: video.filename,
        url: url,
        description: video.description,
        size: `${fileSize.toFixed(2)} MB`
      });
      console.log(`✅ Upload réussi: ${url}\n`);
    } catch (error) {
      console.error(`❌ Échec de l'upload: ${error.message}\n`);
      errors.push(video.filename);
    }
  }
  
  // Sauvegarder les URLs dans un fichier JSON
  if (results.length > 0) {
    const outputPath = path.join(__dirname, '..', 'public', 'hero-videos-urls.json');
    const outputData = {
      uploadedAt: new Date().toISOString(),
      bucket: BUCKET_NAME,
      region: process.env.AWS_REGION || 'eu-north-1',
      videos: results
    };
    fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2));
    console.log('📝 URLs sauvegardées dans public/hero-videos-urls.json');
  }
  
  console.log('\n✨ Upload terminé!');
  console.log(`   ${results.length}/${VIDEOS.length} fichiers uploadés avec succès`);
  
  if (errors.length > 0) {
    console.log(`\n⚠️  ${errors.length} fichiers non trouvés:`);
    errors.forEach(f => console.log(`   - ${f}`));
  }
  
  // Afficher un récapitulatif
  if (results.length > 0) {
    console.log('\n📋 Récapitulatif des URLs S3:');
    results.forEach(r => {
      console.log(`\n   ${r.description}:`);
      console.log(`   ${r.url}`);
      console.log(`   Taille: ${r.size}`);
    });
    
    // Afficher le code TypeScript à utiliser
    console.log('\n💻 Code à utiliser dans hero-aurora.tsx:');
    console.log('   const VIDEO_URLS = {');
    results.forEach(r => {
      const key = r.filename.replace(/\.(webm|mp4|jpg)$/, '').replace(/_/g, '');
      const ext = path.extname(r.filename).replace('.', '');
      console.log(`     ${key}${ext === 'jpg' ? 'Poster' : ext === 'webm' ? 'Webm' : 'Mp4'}: "${r.url}",`);
    });
    console.log('   };');
  }
}

// Si le script est exécuté directement
if (require.main === module) {
  console.log('====================================');
  console.log('   Upload des Vidéos Hero sur S3   ');
  console.log('====================================\n');
  
  console.log('⚠️  IMPORTANT: Assurez-vous que:');
  console.log('   1. Les vidéos sont dans le dossier public/');
  console.log('   2. Les variables AWS sont configurées dans .env.local');
  console.log('   3. Le bucket S3 autorise les uploads publics\n');
  
  uploadAllVideos().catch(error => {
    console.error('❌ Erreur fatale:', error);
    process.exit(1);
  });
}

module.exports = { uploadAllVideos };
