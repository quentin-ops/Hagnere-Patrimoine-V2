#!/bin/bash

echo "🎬 Compression et préparation des vidéos Hero"
echo "============================================="

# Dossier source
SOURCE_DIR="/Users/quentinhagnere/Downloads/GrosFichiers - hnn"
# Dossier destination
DEST_DIR="/Users/quentinhagnere/Development/Hagnéré Patrimoine/hagnere-patrimoine/public"

# Fonction pour afficher la progression
show_progress() {
    echo "📊 $1"
}

# Fonction pour compresser une vidéo
compress_video() {
    local input="$1"
    local output_base="$2"
    local description="$3"
    
    echo ""
    echo "🎬 Traitement : $description"
    echo "   Source: $(basename "$input")"
    
    # Obtenir les dimensions de la vidéo
    local dimensions=$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 "$input" 2>/dev/null)
    echo "   Dimensions: $dimensions"
    
    # WebM avec VP9 (meilleure compression)
    show_progress "Création WebM..."
    ffmpeg -i "$input" \
        -c:v libvpx-vp9 \
        -crf 35 \
        -b:v 1M \
        -tile-columns 2 \
        -g 240 \
        -threads 4 \
        -quality good \
        -speed 2 \
        -auto-alt-ref 1 \
        -lag-in-frames 25 \
        -row-mt 1 \
        -an \
        -y \
        "$DEST_DIR/${output_base}.webm" 2>/dev/null
    
    # MP4 avec H.264 (compatibilité)
    show_progress "Création MP4..."
    ffmpeg -i "$input" \
        -c:v libx264 \
        -crf 28 \
        -preset slow \
        -profile:v high \
        -level 4.0 \
        -movflags +faststart \
        -pix_fmt yuv420p \
        -an \
        -y \
        "$DEST_DIR/${output_base}_h264.mp4" 2>/dev/null
    
    # Poster (première frame)
    show_progress "Création poster..."
    ffmpeg -i "$input" \
        -vframes 1 \
        -q:v 2 \
        -y \
        "$DEST_DIR/${output_base}_poster.jpg" 2>/dev/null
    
    # Afficher les tailles
    local size_original=$(du -h "$input" | cut -f1)
    local size_webm=$(du -h "$DEST_DIR/${output_base}.webm" 2>/dev/null | cut -f1)
    local size_mp4=$(du -h "$DEST_DIR/${output_base}_h264.mp4" 2>/dev/null | cut -f1)
    
    echo "   ✅ Compression terminée:"
    echo "      Original: $size_original"
    echo "      WebM: $size_webm"
    echo "      MP4: $size_mp4"
}

# Début de la compression
echo ""
echo "🚀 Début de la compression des 4 vidéos..."
echo "⏱️  Cela peut prendre 10-15 minutes..."
echo ""

# Hero3 - Verticale Blanc (Light Desktop)
compress_video \
    "$SOURCE_DIR/VIDEO_ACCUEIL_verticale_blanc3.mov" \
    "hero3" \
    "Hero 3 - Verticale Blanc (Light Desktop)"

# Hero4 - Verticale Noir (Dark Desktop)
compress_video \
    "$SOURCE_DIR/VIDEO_ACCUEIL_verticale_noir3.mov" \
    "hero4" \
    "Hero 4 - Verticale Noir (Dark Desktop)"

# Hero1 - 16:9 Blanc (Desktop Fallback)
compress_video \
    "$SOURCE_DIR/VIDEO_ACCUEIL_16-9_blanc3.mov" \
    "hero1" \
    "Hero 1 - 16:9 Blanc (Desktop Fallback)"

# Hero2 - 16:9 Noir (Mobile)
compress_video \
    "$SOURCE_DIR/VIDEO_ACCUEIL_16-9_noir3.mov" \
    "hero2" \
    "Hero 2 - 16:9 Noir (Mobile)"

echo ""
echo "============================================="
echo "✨ Compression terminée !"
echo ""
echo "📁 Fichiers créés dans : $DEST_DIR"
echo ""
ls -lah "$DEST_DIR"/hero*.{webm,mp4,jpg} 2>/dev/null | grep -E "hero[1-4]"
echo ""
echo "📤 Prochaine étape : Uploader sur S3"
echo "   Commande : node scripts/upload-hero-videos.js"
echo "============================================="
