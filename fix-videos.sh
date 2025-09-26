#!/bin/bash

echo "🔧 CORRECTION DES VIDÉOS 4:4:4"
echo "==============================="
echo ""

cd "/Users/quentinhagnere/Development/Hagnéré Patrimoine/hagnere-patrimoine"
mkdir -p videos-optimized

# Les vidéos WebM sont OK, on doit juste corriger les MP4
echo "✅ WebM déjà créés avec succès :"
ls -lah videos-optimized/*.webm 2>/dev/null
echo ""

echo "🔄 Création des MP4 avec conversion de couleur..."
echo ""

# Video 1: 16-9 blanc
echo "[1/4] hero1_h264.mp4..."
ffmpeg -i "/Users/quentinhagnere/Downloads/VIDEO_ACCUEIL_16-9_blanc3.mov" \
  -t 30 \
  -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,format=yuv420p" \
  -c:v libx264 -crf 24 -preset fast \
  -pix_fmt yuv420p \
  -movflags +faststart \
  -an \
  videos-optimized/hero1_h264.mp4 \
  -y 2>/dev/null && echo "   ✅ hero1_h264.mp4 créé" || echo "   ❌ Erreur hero1"

# Video 2: 16-9 noir
echo "[2/4] hero2_h264.mp4..."
ffmpeg -i "/Users/quentinhagnere/Downloads/VIDEO_ACCUEIL_16-9_noir3.mov" \
  -t 30 \
  -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,format=yuv420p" \
  -c:v libx264 -crf 24 -preset fast \
  -pix_fmt yuv420p \
  -movflags +faststart \
  -an \
  videos-optimized/hero2_h264.mp4 \
  -y 2>/dev/null && echo "   ✅ hero2_h264.mp4 créé" || echo "   ❌ Erreur hero2"

# Video 3: verticale blanc
echo "[3/4] hero3_h264.mp4..."
ffmpeg -i "/Users/quentinhagnere/Downloads/VIDEO_ACCUEIL_verticale_blanc3.mov" \
  -t 30 \
  -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,format=yuv420p" \
  -c:v libx264 -crf 24 -preset fast \
  -pix_fmt yuv420p \
  -movflags +faststart \
  -an \
  videos-optimized/hero3_h264.mp4 \
  -y 2>/dev/null && echo "   ✅ hero3_h264.mp4 créé" || echo "   ❌ Erreur hero3"

# Video 4: verticale noir
echo "[4/4] hero4_h264.mp4..."
ffmpeg -i "/Users/quentinhagnere/Downloads/VIDEO_ACCUEIL_verticale_noir3.mov" \
  -t 30 \
  -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,format=yuv420p" \
  -c:v libx264 -crf 24 -preset fast \
  -pix_fmt yuv420p \
  -movflags +faststart \
  -an \
  videos-optimized/hero4_h264.mp4 \
  -y 2>/dev/null && echo "   ✅ hero4_h264.mp4 créé" || echo "   ❌ Erreur hero4"

echo ""
echo "📊 RÉSULTATS FINAUX :"
echo "====================="
echo ""
ls -lah videos-optimized/*.{webm,mp4,jpg} 2>/dev/null | grep -E "(hero1|hero2|hero3|hero4)"
echo ""
echo "🎉 TERMINÉ !"
echo ""
echo "📤 Prochaine étape : http://localhost:3030/test-video-upload"
