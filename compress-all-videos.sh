#!/bin/bash

echo "🎬 Script de compression vidéo automatique"
echo "=========================================="
echo ""

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Dossier source des vidéos
SOURCE_DIR="/Users/quentinhagnere/Downloads/GrosFichiers - hnn"
OUTPUT_DIR="./videos-optimized"
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Créer le dossier de sortie
mkdir -p "$OUTPUT_DIR"

# Vérifier si FFmpeg est installé
if ! command -v ffmpeg &> /dev/null; then
    echo -e "${RED}❌ FFmpeg n'est pas installé${NC}"
    echo "Installation de FFmpeg..."
    brew install ffmpeg
    if [ $? -ne 0 ]; then
        echo -e "${RED}Erreur lors de l'installation de FFmpeg${NC}"
        echo "Essayez manuellement: brew install ffmpeg"
        exit 1
    fi
fi

echo -e "${GREEN}✅ FFmpeg est installé${NC}"
echo ""

# Vérifier si le dossier source existe
if [ ! -d "$SOURCE_DIR" ]; then
    echo -e "${YELLOW}⚠️  Le dossier '$SOURCE_DIR' n'existe pas${NC}"
    echo "Recherche de vidéos dans Downloads..."
    
    # Chercher des vidéos volumineuses
    echo "Vidéos trouvées dans Downloads :"
    find /Users/quentinhagnere/Downloads -type f \( -name "*.mp4" -o -name "*.mov" -o -name "*.avi" \) -size +100M 2>/dev/null | while read -r video; do
        SIZE=$(du -h "$video" | cut -f1)
        echo "  - $video ($SIZE)"
    done
    
    echo ""
    echo "Veuillez vérifier le chemin de vos vidéos et relancer le script"
    exit 1
fi

# Lister les vidéos dans le dossier
echo "📁 Recherche des vidéos dans : $SOURCE_DIR"
echo ""

# Compter les vidéos
VIDEO_COUNT=0
for video in "$SOURCE_DIR"/*.{mp4,mov,avi,MOV,MP4,AVI}; do
    if [ -f "$video" ]; then
        VIDEO_COUNT=$((VIDEO_COUNT + 1))
    fi
done

if [ $VIDEO_COUNT -eq 0 ]; then
    echo -e "${RED}❌ Aucune vidéo trouvée dans le dossier${NC}"
    exit 1
fi

echo -e "${GREEN}✅ $VIDEO_COUNT vidéo(s) trouvée(s)${NC}"
echo ""

# Traiter chaque vidéo
COUNTER=1
for video in "$SOURCE_DIR"/*.{mp4,mov,avi,MOV,MP4,AVI}; do
    if [ ! -f "$video" ]; then
        continue
    fi
    
    FILENAME=$(basename "$video")
    SIZE=$(du -h "$video" | cut -f1)
    
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo -e "${YELLOW}📹 Vidéo $COUNTER/$VIDEO_COUNT : $FILENAME${NC}"
    echo "   Taille originale : $SIZE"
    echo ""
    
    OUTPUT_NAME="hero$COUNTER"
    
    echo "🔄 Compression en cours..."
    echo "   Nom de sortie : $OUTPUT_NAME"
    echo ""
    
    # WebM VP9
    echo "   [1/4] Création WebM..."
    ffmpeg -i "$video" -t 30 \
        -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" \
        -c:v libvpx-vp9 -crf 35 -b:v 0 -cpu-used 4 -row-mt 1 -an \
        -auto-alt-ref 1 -lag-in-frames 25 -tile-columns 2 -tile-rows 2 -threads 8 \
        "$OUTPUT_DIR/${OUTPUT_NAME}.webm" \
        -y -loglevel error 2>&1
    
    if [ $? -eq 0 ]; then
        WEBM_SIZE=$(du -h "$OUTPUT_DIR/${OUTPUT_NAME}.webm" | cut -f1)
        echo -e "   ${GREEN}✓ WebM créé ($WEBM_SIZE)${NC}"
    else
        echo -e "   ${RED}✗ Erreur WebM${NC}"
    fi
    
    # MP4 H.264
    echo "   [2/4] Création MP4..."
    ffmpeg -i "$video" -t 30 \
        -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" \
        -c:v libx264 -crf 25 -preset slow -profile:v main -movflags +faststart -an \
        "$OUTPUT_DIR/${OUTPUT_NAME}_h264.mp4" \
        -y -loglevel error 2>&1
    
    if [ $? -eq 0 ]; then
        MP4_SIZE=$(du -h "$OUTPUT_DIR/${OUTPUT_NAME}_h264.mp4" | cut -f1)
        echo -e "   ${GREEN}✓ MP4 créé ($MP4_SIZE)${NC}"
    else
        echo -e "   ${RED}✗ Erreur MP4${NC}"
    fi
    
    # Mobile
    echo "   [3/4] Création version mobile..."
    ffmpeg -i "$video" -t 30 \
        -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2" \
        -c:v libx264 -crf 28 -preset fast -profile:v baseline -movflags +faststart -an \
        "$OUTPUT_DIR/${OUTPUT_NAME}_mobile.mp4" \
        -y -loglevel error 2>&1
    
    if [ $? -eq 0 ]; then
        MOBILE_SIZE=$(du -h "$OUTPUT_DIR/${OUTPUT_NAME}_mobile.mp4" | cut -f1)
        echo -e "   ${GREEN}✓ Mobile créé ($MOBILE_SIZE)${NC}"
    else
        echo -e "   ${RED}✗ Erreur Mobile${NC}"
    fi
    
    # Poster
    echo "   [4/4] Création poster..."
    ffmpeg -i "$video" \
        -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,select=eq(n\,0)" \
        -frames:v 1 \
        "$OUTPUT_DIR/${OUTPUT_NAME}_poster.jpg" \
        -y -loglevel error 2>&1
    
    # WebP poster
    if [ -f "$OUTPUT_DIR/${OUTPUT_NAME}_poster.jpg" ]; then
        ffmpeg -i "$OUTPUT_DIR/${OUTPUT_NAME}_poster.jpg" \
            -c:v libwebp -quality 85 \
            "$OUTPUT_DIR/${OUTPUT_NAME}_poster.webp" \
            -y -loglevel error 2>&1
        
        POSTER_SIZE=$(du -h "$OUTPUT_DIR/${OUTPUT_NAME}_poster.jpg" | cut -f1)
        echo -e "   ${GREEN}✓ Poster créé ($POSTER_SIZE)${NC}"
    fi
    
    echo ""
    COUNTER=$((COUNTER + 1))
    
    # Limiter à 4 vidéos
    if [ $COUNTER -gt 4 ]; then
        echo -e "${YELLOW}⚠️  Limite de 4 vidéos atteinte${NC}"
        break
    fi
done

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${GREEN}🎉 Compression terminée !${NC}"
echo ""
echo "📊 Résumé :"
echo "──────────"

for i in 1 2 3 4; do
    if [ -f "$OUTPUT_DIR/hero$i.webm" ]; then
        echo ""
        echo "Hero $i:"
        [ -f "$OUTPUT_DIR/hero$i.webm" ] && echo "  • WebM    : $(du -h "$OUTPUT_DIR/hero$i.webm" | cut -f1)"
        [ -f "$OUTPUT_DIR/hero${i}_h264.mp4" ] && echo "  • MP4     : $(du -h "$OUTPUT_DIR/hero${i}_h264.mp4" | cut -f1)"
        [ -f "$OUTPUT_DIR/hero${i}_mobile.mp4" ] && echo "  • Mobile  : $(du -h "$OUTPUT_DIR/hero${i}_mobile.mp4" | cut -f1)"
        [ -f "$OUTPUT_DIR/hero${i}_poster.jpg" ] && echo "  • Poster  : $(du -h "$OUTPUT_DIR/hero${i}_poster.jpg" | cut -f1)"
    fi
done

echo ""
echo "📁 Fichiers dans : $OUTPUT_DIR/"
echo ""
echo -e "${GREEN}✅ Prochaine étape :${NC}"
echo "   1. Allez sur http://localhost:3030/test-video-upload"
echo "   2. Uploadez les fichiers .webm et .mp4 de chaque hero"
echo "   3. Copiez les URLs S3 générées"
echo "   4. Mettez à jour components/hero-aurora.tsx avec les URLs"
echo ""
