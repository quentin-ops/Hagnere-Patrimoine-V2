#!/bin/bash

# Script pour copier les vidéos dans le dossier public

cd "/Users/quentinhagnere/Development/Hagnéré Patrimoine/hagnere-patrimoine"

echo "📹 COPIE DES VIDÉOS VERS PUBLIC"
echo "================================"
echo ""

# Copier les vidéos WebM
echo "Copie de hero1.webm..."
cp videos-optimized/hero1.webm public/hero1.webm 2>/dev/null && echo "✅ OK" || echo "❌ Erreur"

echo "Copie de hero2.webm..."
cp videos-optimized/hero2.webm public/hero2.webm 2>/dev/null && echo "✅ OK" || echo "❌ Erreur"

echo "Copie de hero3.webm (vidéo verticale blanc pour mode Light)..."
cp videos-optimized/hero3.webm public/hero3.webm 2>/dev/null && echo "✅ OK" || echo "❌ Erreur"

echo "Copie de hero4.webm..."
cp videos-optimized/hero4.webm public/hero4.webm 2>/dev/null && echo "✅ OK" || echo "❌ Erreur"

# Copier les MP4
echo ""
echo "Copie des MP4..."
cp videos-optimized/hero1_h264.mp4 public/hero1_h264.mp4 2>/dev/null && echo "✅ hero1_h264.mp4" || echo "⚠️  hero1_h264.mp4 vide ou manquant"
cp videos-optimized/hero2_h264.mp4 public/hero2_h264.mp4 2>/dev/null && echo "✅ hero2_h264.mp4" || echo "⚠️  hero2_h264.mp4 vide ou manquant"
cp videos-optimized/hero3_h264.mp4 public/hero3_h264.mp4 2>/dev/null && echo "✅ hero3_h264.mp4" || echo "⚠️  hero3_h264.mp4 vide ou manquant"
cp videos-optimized/hero4_h264.mp4 public/hero4_h264.mp4 2>/dev/null && echo "✅ hero4_h264.mp4" || echo "⚠️  hero4_h264.mp4 vide ou manquant"

# Copier les posters
echo ""
echo "Copie des images poster..."
cp videos-optimized/hero1_poster.jpg public/hero1_poster.jpg 2>/dev/null && echo "✅ hero1_poster.jpg" || echo "❌ Erreur"
cp videos-optimized/hero2_poster.jpg public/hero2_poster.jpg 2>/dev/null && echo "✅ hero2_poster.jpg" || echo "❌ Erreur"
cp videos-optimized/hero3_poster.jpg public/hero3_poster.jpg 2>/dev/null && echo "✅ hero3_poster.jpg" || echo "❌ Erreur"
cp videos-optimized/hero4_poster.jpg public/hero4_poster.jpg 2>/dev/null && echo "✅ hero4_poster.jpg" || echo "❌ Erreur"

echo ""
echo "📊 Fichiers dans public/ :"
ls -lah public/*.webm public/*.mp4 public/*.jpg 2>/dev/null | grep hero

echo ""
echo "✨ CONFIGURATION ACTUELLE :"
echo "==========================="
echo "• Mode LIGHT + Desktop → hero3.webm (Verticale Blanc)"
echo "• Mode DARK + Desktop  → hero4.webm (Verticale Noir)"
echo "• Desktop par défaut   → hero1.webm (16:9 Blanc)"
echo "• Mobile              → hero2.webm (16:9 Noir)"
echo ""
echo "🎬 La vidéo verticale blanc (hero3) se lance automatiquement"
echo "   en boucle en mode Light sur Desktop !"
echo ""
echo "Appuyez sur Entrée pour fermer..."
read
