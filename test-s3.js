#!/usr/bin/env node

const https = require('https');

// URLs à tester
const urls = [
  {
    name: 'Logo local (devrait marcher)',
    url: 'https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1757695115817-logo-patrimoine-black--100w.webp'
  },
  {
    name: 'Nouvelle image uploadée',
    url: 'https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1757950091658-c8398c68e25b44ca.png'
  }
];

console.log('🔍 Test d\'accès aux images S3...\n');

urls.forEach(({ name, url }) => {
  https.get(url, (res) => {
    console.log(`📍 ${name}`);
    console.log(`   URL: ${url}`);
    console.log(`   Status: ${res.statusCode} ${res.statusMessage}`);

    if (res.statusCode === 200) {
      console.log(`   ✅ Accessible publiquement`);
    } else if (res.statusCode === 403) {
      console.log(`   ❌ Erreur 403: Accès refusé (bucket non public ou ACL manquante)`);
    } else if (res.statusCode === 404) {
      console.log(`   ❌ Erreur 404: Fichier non trouvé`);
    }

    // Afficher les headers importants
    if (res.headers['content-type']) {
      console.log(`   Content-Type: ${res.headers['content-type']}`);
    }
    if (res.headers['x-amz-request-id']) {
      console.log(`   AWS Request ID: ${res.headers['x-amz-request-id']}`);
    }
    console.log('');
  }).on('error', (err) => {
    console.error(`❌ Erreur de connexion: ${err.message}\n`);
  });
});

console.log('\n💡 Solutions possibles si erreur 403:');
console.log('1. Aller dans AWS Console > S3 > bucket "hagnerepatrimoine"');
console.log('2. Onglet "Permissions" > Désactiver "Block all public access"');
console.log('3. Ajouter une politique de bucket publique:');
console.log(`
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::hagnerepatrimoine/*"
    }
  ]
}
`);