#!/bin/bash

echo "📹 Configuration des vidéos pour la Hero Section"
echo "================================================"
echo ""

# Créer le dossier public/videos-optimized
mkdir -p public/videos-optimized

# Copier tous les fichiers vidéo
echo "📁 Copie des vidéos vers public/videos-optimized..."
cp -v videos-optimized/*.webm public/videos-optimized/
cp -v videos-optimized/*_h264.mp4 public/videos-optimized/
cp -v videos-optimized/*_poster.jpg public/videos-optimized/

echo ""
echo "✅ Fichiers copiés :"
ls -lah public/videos-optimized/ | grep -E "(webm|mp4|jpg)"

echo ""
echo "🎬 Configuration actuelle :"
echo "============================"
echo "• Mode LIGHT + Desktop → Vidéo verticale BLANC (hero3)"
echo "• Mode DARK + Desktop  → Vidéo verticale NOIR (hero4)"
echo "• Desktop par défaut   → Vidéo 16:9 BLANC (hero1)"
echo "• Mobile              → Vidéo 16:9 NOIR (hero2)"
echo ""
echo "✅ La lecture automatique est activée !"
echo "✅ La vidéo tourne en boucle !"
echo ""
echo "🚀 Relancez le serveur : PORT=3030 npm run dev"
