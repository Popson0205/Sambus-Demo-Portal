#!/bin/bash
# Starts both the API server (port 3001) and Vite dev server (port 3000)
# Usage: bash start.sh
echo "Starting Sambus Demo Portal..."
node server.js &
bun run dev
