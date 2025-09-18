const fs = require('fs');
const path = require('path');

async function uploadIcon() {
  const iconPath = path.join(__dirname, '../public/icons/bank-icon.svg');
  const iconBuffer = fs.readFileSync(iconPath);
  
  const formData = new FormData();
  const blob = new Blob([iconBuffer], { type: 'image/svg+xml' });
  formData.append('file', blob, 'bank-icon.svg');
  formData.append('folder', 'icons');

  try {
    const response = await fetch('http://localhost:3001/api/upload-optimized', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    console.log('Upload result:', result);
  } catch (error) {
    console.error('Upload error:', error);
  }
}

uploadIcon();