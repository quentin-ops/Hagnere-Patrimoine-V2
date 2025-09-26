#!/bin/bash

# Script de compression vidéo pour hero sections
# Utilisation: ./compress-videos.sh input.mp4 [output_name]

# Vérifier les arguments
if [ "$#" -lt 1 ]; then
    echo "Usage: $0 <input_video> [output_name]"
    echo "Exemple: $0 hero-video.mp4 hero"
    exit 1
fi

INPUT_VIDEO="$1"
OUTPUT_NAME="${2:-$(basename "$INPUT_VIDEO" .mp4)}"
OUTPUT_DIR="./videos-optimized"

# Créer le dossier de sortie
mkdir -p "$OUTPUT_DIR"

echo "🎬 Compression de $INPUT_VIDEO..."
echo "📁 Sortie dans: $OUTPUT_DIR"

# Obtenir les infos de la vidéo
DURATION=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$INPUT_VIDEO" 2>/dev/null | cut -d. -f1)
echo "⏱️  Durée: ${DURATION}s"

# Si la vidéo fait plus de 30 secondes, on la coupe
if [ "$DURATION" -gt 30 ]; then
    echo "⚠️  Vidéo trop longue, découpage à 30s..."
    TRIM_OPTION="-t 30"
else
    TRIM_OPTION=""
fi

# 1. WebM VP9 - Meilleure compression
echo "🔄 Création WebM VP9..."
ffmpeg -i "$INPUT_VIDEO" $TRIM_OPTION \
  -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" \
  -c:v libvpx-vp9 \
  -crf 35 \
  -b:v 0 \
  -cpu-used 4 \
  -row-mt 1 \
  -an \
  -auto-alt-ref 1 \
  -lag-in-frames 25 \
  -tile-columns 2 \
  -tile-rows 2 \
  -threads 8 \
  "$OUTPUT_DIR/${OUTPUT_NAME}.webm" \
  -y -loglevel error

# 2. MP4 H.264 - Compatibilité universelle
echo "🔄 Création MP4 H.264..."
ffmpeg -i "$INPUT_VIDEO" $TRIM_OPTION \
  -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" \
  -c:v libx264 \
  -crf 25 \
  -preset slow \
  -profile:v main \
  -movflags +faststart \
  -an \
  "$OUTPUT_DIR/${OUTPUT_NAME}_h264.mp4" \
  -y -loglevel error

# 3. Version mobile (720p)
echo "🔄 Création version mobile..."
ffmpeg -i "$INPUT_VIDEO" $TRIM_OPTION \
  -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2" \
  -c:v libx264 \
  -crf 28 \
  -preset fast \
  -profile:v baseline \
  -movflags +faststart \
  -an \
  "$OUTPUT_DIR/${OUTPUT_NAME}_mobile.mp4" \
  -y -loglevel error

# 4. Poster image (première frame)
echo "🔄 Création poster image..."
ffmpeg -i "$INPUT_VIDEO" \
  -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,select=eq(n\,0)" \
  -frames:v 1 \
  "$OUTPUT_DIR/${OUTPUT_NAME}_poster.jpg" \
  -y -loglevel error

# Créer aussi une version WebP du poster
ffmpeg -i "$OUTPUT_DIR/${OUTPUT_NAME}_poster.jpg" \
  -c:v libwebp \
  -quality 85 \
  "$OUTPUT_DIR/${OUTPUT_NAME}_poster.webp" \
  -y -loglevel error

# Afficher les tailles
echo ""
echo "✅ Compression terminée !"
echo "📊 Résultats :"
echo ""

ORIGINAL_SIZE=$(du -h "$INPUT_VIDEO" | cut -f1)
echo "Original : $ORIGINAL_SIZE"
echo "---"

if [ -f "$OUTPUT_DIR/${OUTPUT_NAME}.webm" ]; then
    WEBM_SIZE=$(du -h "$OUTPUT_DIR/${OUTPUT_NAME}.webm" | cut -f1)
    echo "WebM     : $WEBM_SIZE"
fi

if [ -f "$OUTPUT_DIR/${OUTPUT_NAME}_h264.mp4" ]; then
    MP4_SIZE=$(du -h "$OUTPUT_DIR/${OUTPUT_NAME}_h264.mp4" | cut -f1)
    echo "MP4      : $MP4_SIZE"
fi

if [ -f "$OUTPUT_DIR/${OUTPUT_NAME}_mobile.mp4" ]; then
    MOBILE_SIZE=$(du -h "$OUTPUT_DIR/${OUTPUT_NAME}_mobile.mp4" | cut -f1)
    echo "Mobile   : $MOBILE_SIZE"
fi

if [ -f "$OUTPUT_DIR/${OUTPUT_NAME}_poster.jpg" ]; then
    POSTER_SIZE=$(du -h "$OUTPUT_DIR/${OUTPUT_NAME}_poster.jpg" | cut -f1)
    echo "Poster   : $POSTER_SIZE"
fi

echo ""
echo "📁 Fichiers dans : $OUTPUT_DIR/"
