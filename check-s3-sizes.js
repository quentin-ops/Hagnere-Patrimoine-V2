#!/usr/bin/env node

const https = require('https');

// URLs des logos depuis logo-config.ts
const logos = [
  {
    name: 'Logo Patrimoine Black',
    url: 'https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1757695115817-logo-patrimoine-black--100w.webp'
  },
  {
    name: 'Logo Patrimoine White',
    url: 'https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1757695117053-logo-hagnere-patrimoine-white-100w.webp'
  },
  {
    name: 'Logo Elite Light',
    url: 'https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1757695112830-logo-hagnere-elite-light-100w.webp'
  },
  {
    name: 'Logo Elite Dark',
    url: 'https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1757695114419-logo-hagnere-elite-ldark-100w.webp'
  },
  {
    name: 'Nouvelle image Elite PNG',
    url: 'https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1757950091658-c8398c68e25b44ca.png'
  }
];

console.log('📊 Analyse du poids des images S3\n');
console.log('=' .repeat(60));

let totalSize = 0;

logos.forEach(({ name, url }) => {
  https.get(url, (res) => {
    const contentLength = res.headers['content-length'];
    const contentType = res.headers['content-type'];
    const cacheControl = res.headers['cache-control'];

    if (contentLength) {
      const sizeKB = (parseInt(contentLength) / 1024).toFixed(1);
      const sizeMB = (parseInt(contentLength) / 1024 / 1024).toFixed(2);
      totalSize += parseInt(contentLength);

      console.log(`\n📍 ${name}`);
      console.log(`   Taille: ${sizeKB} KB (${sizeMB} MB)`);
      console.log(`   Format: ${contentType}`);
      console.log(`   Cache: ${cacheControl || 'Non défini'}`);

      // Recommandations
      if (parseInt(contentLength) > 100 * 1024) {
        console.log(`   ⚠️  Image > 100KB - Considérer une compression supplémentaire`);
      } else if (parseInt(contentLength) > 50 * 1024) {
        console.log(`   ⚡ Image entre 50-100KB - Acceptable mais peut être optimisée`);
      } else {
        console.log(`   ✅ Taille optimale < 50KB`);
      }

      // Vérifier le format
      if (contentType === 'image/png' && parseInt(contentLength) > 50 * 1024) {
        console.log(`   💡 PNG détecté - WebP ou AVIF serait plus efficace`);
      }
    }
  }).on('error', (err) => {
    console.error(`❌ Erreur: ${err.message}`);
  });
});

setTimeout(() => {
  console.log('\n' + '=' .repeat(60));
  console.log(`\n📈 Taille totale: ${(totalSize / 1024).toFixed(1)} KB (${(totalSize / 1024 / 1024).toFixed(2)} MB)`);

  console.log('\n💡 Recommandations d\'optimisation:');
  console.log('1. Logos < 50KB : ✅ Excellent');
  console.log('2. Logos 50-100KB : ⚡ Acceptable');
  console.log('3. Logos > 100KB : ⚠️  À optimiser');
  console.log('\n4. Formats recommandés:');
  console.log('   - WebP: Meilleur compromis qualité/taille');
  console.log('   - AVIF: Plus efficace mais support limité');
  console.log('   - PNG: Seulement si transparence nécessaire');
  console.log('   - SVG: Idéal pour logos vectoriels simples');
}, 2000);