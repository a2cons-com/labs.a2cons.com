#!/bin/sh
# Web copies of the site's images (needs ImageMagick with AVIF and cwebp).
#
#   tools/build-images.sh art     # AI-generated backgrounds: ./1.png ./2.png ./3.png
#                                 #   -> public/img/<name>-{960,1672}.{avif,webp}
#   tools/build-images.sh shots   # screenshots in public/shots/*.webp
#                                 #   -> <name>-<w>.webp smaller copies for srcset
set -e
cd "$(dirname "$0")/.."

art() {
  src=$1 name=$2
  [ -f "$src" ] || { echo "skip $src (missing)"; return; }
  for w in 960 1672; do
    magick "$src" -resize "${w}x" -strip -quality 55 "public/img/$name-$w.avif"
    magick "$src" -resize "${w}x" -strip "png:-" | cwebp -quiet -q 72 -o "public/img/$name-$w.webp" -- -
  done
  echo "art: $name"
}

shots() {
  for f in public/shots/*.webp; do
    case "$f" in *-[0-9]*.webp) continue ;; esac
    w=$(magick identify -format %w "$f")
    if [ "$w" -ge 2000 ]; then sizes="1280"; else sizes="400"; fi
    for s in $sizes; do
      magick "$f" -resize "${s}x" -strip "png:-" | cwebp -quiet -q 80 -o "${f%.webp}-$s.webp" -- -
    done
    echo "shot: $f"
  done
}

case "${1:-all}" in
  art) art 1.png hero-network; art 2.png workbench; art 3.png packets ;;
  shots) shots ;;
  all) art 1.png hero-network; art 2.png workbench; art 3.png packets; shots ;;
esac
