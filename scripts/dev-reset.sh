#!/usr/bin/env sh
set -e

# Stop stray Next dev servers that keep .next locked or half-written.
for port in 3000 3001 3002; do
  pids=$(lsof -ti:"$port" 2>/dev/null || true)
  if [ -n "$pids" ]; then
    echo "Stopping process on port $port ($pids)..."
    kill $pids 2>/dev/null || true
  fi
done

sleep 0.5

rm -rf .next node_modules/.cache

echo "Cache cleared. Starting dev server on port 3000..."
exec next dev
