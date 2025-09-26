#!/bin/bash

echo "🎬 CRÉATION DES MP4 MANQUANTS"
echo "=============================="
echo ""

cd "/Users/quentinhagnere/Development/Hagnéré Patrimoine/hagnere-patrimoine"

# Vidéo verticale blanc (hero3) - la plus importante pour le mode light
echo "📹 Création hero3_h264.mp4 (vidéo verticale blanc)..."
ffmpeg -i "/Users/quentinhagnere/Downloads/VIDEO_ACCUEIL_verticale_blanc3.mov" \
  -t 30 \
  -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2,format=yuv420p" \
  -c:v libx264 \
  -crf 23 \
  -preset medium \
  -pix_fmt yuv420p \
  -color_primaries bt709 \
  -color_trc bt709 \
  -colorspace bt709 \
  -movflags +faststart \
  -an \
  videos-optimized/hero3_h264.mp4 \
  -y

# Vidéo 16:9 blanc (hero1)
echo "📹 Création hero1_h264.mp4 (16:9 blanc)..."
ffmpeg -i "/Users/quentinhagnere/Downloads/VIDEO_ACCUEIL_16-9_blanc3.mov" \
  -t 30 \
  -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,format=yuv420p" \
  -c:v libx264 \
  -crf 23 \
  -preset medium \
  -pix_fmt yuv420p \
  -color_primaries bt709 \
  -color_trc bt709 \
  -colorspace bt709 \
  -movflags +faststart \
  -an \
  videos-optimized/hero1_h264.mp4 \
  -y

echo ""
echo "✅ Fichiers créés :"
ls -lah videos-optimized/hero3* videos-optimized/hero1*
