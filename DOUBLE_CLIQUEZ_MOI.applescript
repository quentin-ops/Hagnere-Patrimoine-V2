#!/usr/bin/osascript

-- Script de compression vidéo automatique
-- Double-cliquez sur ce fichier pour compresser vos vidéos

tell application "Terminal"
    activate
    
    -- Créer une nouvelle fenêtre Terminal
    do script "echo '🎬 COMPRESSION VIDÉO AUTOMATIQUE'; echo '=============================='; echo ''"
    
    delay 1
    
    -- Aller dans le bon dossier
    do script "cd '/Users/quentinhagnere/Development/Hagnéré Patrimoine/hagnere-patrimoine'" in front window
    
    delay 1
    
    -- Créer le dossier de sortie
    do script "mkdir -p videos-optimized" in front window
    
    delay 1
    
    -- Installer FFmpeg si nécessaire
    do script "which ffmpeg || brew install ffmpeg" in front window
    
    delay 3
    
    -- Message d'instructions
    do script "echo ''; echo '📋 INSTRUCTIONS :'; echo '1. Les vidéos seront cherchées dans votre dossier Downloads'; echo '2. La compression va commencer dans 5 secondes...'; echo ''" in front window
    
    delay 5
    
    -- Lancer le script de compression
    do script "./compress-all-videos.sh" in front window
    
end tell
