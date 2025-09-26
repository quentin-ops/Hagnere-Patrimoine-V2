#!/usr/bin/env python3

import os
import shutil

print("📹 Copie des vidéos vers public/")
print("=================================")

# Fichiers à copier
files_to_copy = [
    ("videos-optimized/hero1.webm", "public/hero1.webm"),
    ("videos-optimized/hero2.webm", "public/hero2.webm"),
    ("videos-optimized/hero3.webm", "public/hero3.webm"),
    ("videos-optimized/hero4.webm", "public/hero4.webm"),
    ("videos-optimized/hero1_h264.mp4", "public/hero1_h264.mp4"),
    ("videos-optimized/hero2_h264.mp4", "public/hero2_h264.mp4"),
    ("videos-optimized/hero3_h264.mp4", "public/hero3_h264.mp4"),
    ("videos-optimized/hero4_h264.mp4", "public/hero4_h264.mp4"),
    ("videos-optimized/hero1_poster.jpg", "public/hero1_poster.jpg"),
    ("videos-optimized/hero2_poster.jpg", "public/hero2_poster.jpg"),
    ("videos-optimized/hero3_poster.jpg", "public/hero3_poster.jpg"),
    ("videos-optimized/hero4_poster.jpg", "public/hero4_poster.jpg"),
]

# Copier les fichiers
for src, dst in files_to_copy:
    try:
        if os.path.exists(src):
            shutil.copy2(src, dst)
            size = os.path.getsize(dst) / (1024*1024)
            if size < 1:
                size_str = f"{os.path.getsize(dst)/1024:.0f} KB"
            else:
                size_str = f"{size:.1f} MB"
            print(f"✅ {os.path.basename(dst)} ({size_str})")
        else:
            print(f"⚠️  {src} non trouvé")
    except Exception as e:
        print(f"❌ Erreur pour {src}: {e}")

print("")
print("✨ Configuration :")
print("==================")
print("• Mode LIGHT Desktop → hero3.webm (Verticale Blanc)")
print("• Mode DARK Desktop  → hero4.webm (Verticale Noir)")
print("")
print("🎬 La vidéo se lance automatiquement en boucle !")
print("")
print("🚀 Lancez : PORT=3030 npm run dev")
