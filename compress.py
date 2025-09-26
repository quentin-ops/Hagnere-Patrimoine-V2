#!/usr/bin/env python3

import os
import subprocess
import sys

print("🎬 COMPRESSION VIDÉO PYTHON")
print("===========================")
print()

# Chemins
videos_dir = "/Users/quentinhagnere/Downloads"
output_dir = "./videos-optimized"

# Créer le dossier de sortie
os.makedirs(output_dir, exist_ok=True)

# Liste des vidéos
videos = [
    ("VIDEO_ACCUEIL_16-9_blanc3.mov", "hero1"),
    ("VIDEO_ACCUEIL_16-9_noir3.mov", "hero2"),
    ("VIDEO_ACCUEIL_verticale_blanc3.mov", "hero3"),
    ("VIDEO_ACCUEIL_verticale_noir3.mov", "hero4")
]

print("📁 Vidéos à traiter :")
for video_file, output_name in videos:
    full_path = os.path.join(videos_dir, video_file)
    if os.path.exists(full_path):
        size = os.path.getsize(full_path) / (1024*1024*1024)
        print(f"   ✓ {video_file} ({size:.1f} GB)")
    else:
        print(f"   ✗ {video_file} (non trouvé)")
print()

# Traiter chaque vidéo
for video_file, output_name in videos:
    input_path = os.path.join(videos_dir, video_file)
    
    if not os.path.exists(input_path):
        print(f"⚠️  {video_file} non trouvé, passage au suivant...")
        continue
    
    print(f"🔄 Traitement de {output_name}...")
    
    # MP4 avec conversion couleur
    mp4_output = os.path.join(output_dir, f"{output_name}_h264.mp4")
    if not os.path.exists(mp4_output):
        print(f"   Création MP4...")
        cmd = [
            "ffmpeg", "-i", input_path,
            "-t", "30",
            "-vf", "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,format=yuv420p",
            "-c:v", "libx264",
            "-crf", "24",
            "-preset", "fast",
            "-pix_fmt", "yuv420p",
            "-movflags", "+faststart",
            "-an",
            mp4_output,
            "-y"
        ]
        try:
            subprocess.run(cmd, capture_output=True, check=True)
            size = os.path.getsize(mp4_output) / (1024*1024)
            print(f"   ✅ MP4 créé ({size:.1f} MB)")
        except subprocess.CalledProcessError:
            print(f"   ❌ Erreur MP4")
    else:
        size = os.path.getsize(mp4_output) / (1024*1024)
        print(f"   ✅ MP4 existe déjà ({size:.1f} MB)")
    
    # WebM si pas déjà fait
    webm_output = os.path.join(output_dir, f"{output_name}.webm")
    if not os.path.exists(webm_output):
        print(f"   Création WebM...")
        cmd = [
            "ffmpeg", "-i", input_path,
            "-t", "30",
            "-vf", "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2",
            "-c:v", "libvpx-vp9",
            "-crf", "35",
            "-b:v", "0",
            "-cpu-used", "4",
            "-an",
            webm_output,
            "-y"
        ]
        try:
            subprocess.run(cmd, capture_output=True, check=True)
            size = os.path.getsize(webm_output) / (1024*1024)
            print(f"   ✅ WebM créé ({size:.1f} MB)")
        except subprocess.CalledProcessError:
            print(f"   ❌ Erreur WebM")
    else:
        size = os.path.getsize(webm_output) / (1024*1024)
        print(f"   ✅ WebM existe déjà ({size:.1f} MB)")
    
    print()

print("=" * 50)
print("📊 RÉSULTAT FINAL :")
print()

# Afficher les fichiers créés
for i in range(1, 5):
    print(f"Hero {i}:")
    files = [
        (f"hero{i}.webm", "WebM"),
        (f"hero{i}_h264.mp4", "MP4"),
        (f"hero{i}_poster.jpg", "Poster")
    ]
    for filename, label in files:
        filepath = os.path.join(output_dir, filename)
        if os.path.exists(filepath):
            size = os.path.getsize(filepath)
            if size > 1024*1024:
                size_str = f"{size/(1024*1024):.1f} MB"
            else:
                size_str = f"{size/1024:.0f} KB"
            print(f"   ✅ {label}: {size_str}")
    print()

print("🎉 TERMINÉ !")
print()
print("👉 Prochaine étape : http://localhost:3030/test-video-upload")
