#!/usr/bin/env bash
# One-off optimizer: transcode to 720p H.264 + extract poster frame.
set -e
cd "$(dirname "$0")/video" || exit 1
mkdir -p optimized posters

for f in "ramadansale2.mp4" "Banting monitor .mp4" "outro april.mp4" "buat bunda lala.mp4" "ginela_ledis.mp4" "GNL-007.mp4" "mirip.mp4"; do
  base="${f%.*}"
  out="optimized/${base}.mp4"
  poster="posters/${base}.jpg"
  echo "==> transcode: $f"
  ffmpeg -y -i "$f" -vf "scale=-2:720" -c:v libx264 -crf 28 -preset medium -movflags +faststart -c:a aac -b:a 96k "$out"
  echo "==> poster: $f"
  ffmpeg -y -i "$f" -ss 00:00:01 -frames:v 1 -q:v 3 "$poster"
  echo "    done: $(du -h "$out" | cut -f1) / poster $(du -h "$poster" | cut -f1)"
done
echo "ALL DONE"
