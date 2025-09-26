#!/bin/bash

# Ce script compresse automatiquement vos vidéos
# Double-cliquez sur ce fichier pour l'exécuter

cd "/Users/quentinhagnere/Development/Hagnéré Patrimoine/hagnere-patrimoine"

echo "🎬 COMPRESSION VIDÉO AUTOMATIQUE"
echo "================================"
echo ""

# Installation FFmpeg si nécessaire
if ! command -v ffmpeg &> /dev/null; then
    echo "Installation de FFmpeg..."
    /opt/homebrew/bin/brew install ffmpeg || /usr/local/bin/brew install ffmpeg || brew install ffmpeg
fi

# Créer dossier de sortie
mkdir -p videos-optimized

# Chercher les vidéos
echo "Recherche des vidéos..."
echo ""

# Option 1: Dossier GrosFichiers - hnn
if [ -d "/Users/quentinhagnere/Downloads/GrosFichiers - hnn" ]; then
    SOURCE="/Users/quentinhagnere/Downloads/GrosFichiers - hnn"
    echo "✅ Dossier trouvé: $SOURCE"
else
    # Option 2: Chercher dans tout Downloads
    echo "Recherche dans Downloads..."
    SOURCE="/Users/quentinhagnere/Downloads"
fi

# Compter les vidéos
COUNT=1
for video in "$SOURCE"/*.{mp4,MP4,mov,MOV,avi,AVI} 2>/dev/null; do
    if [ -f "$video" ]; then
        echo "📹 Trouvé: $(basename "$video") ($(du -h "$video" | cut -f1))"
        
        if [ $COUNT -le 4 ]; then
            echo "   → Compression en hero$COUNT..."
            
            # Compression rapide
            ffmpeg -i "$video" -t 30 \
                -vf scale=1920:1080 \
                -c:v libx264 -crf 26 -preset faster \
                -an \
                "videos-optimized/hero${COUNT}.mp4" \
                -y -loglevel error
            
            # WebM
            ffmpeg -i "$video" -t 30 \
                -vf scale=1920:1080 \
                -c:v libvpx-vp9 -crf 36 -b:v 0 \
                -an \
                "videos-optimized/hero${COUNT}.webm" \
                -y -loglevel error
            
            # Poster
            ffmpeg -i "$video" -vf scale=1920:1080 -frames:v 1 \
                "videos-optimized/hero${COUNT}_poster.jpg" \
                -y -loglevel error
            
            echo "   ✅ Compression terminée"
            COUNT=$((COUNT + 1))
        fi
    fi
done

echo ""
echo "🎉 TERMINÉ !"
echo ""
echo "📁 Vos vidéos compressées sont dans:"
echo "   videos-optimized/"
echo ""
ls -lah videos-optimized/*.{mp4,webm,jpg} 2>/dev/null
echo ""
echo "👉 Prochaine étape:"
echo "   http://localhost:3030/test-video-upload"
echo ""
echo "Appuyez sur Entrée pour fermer..."
read
