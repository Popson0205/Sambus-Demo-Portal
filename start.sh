#!/bin/bash
# Start both the API server and Vite dev server
# Usage: bash start.sh
echo "Starting Sambus Demo Portal..."
node server.js &
API_PID=$!
echo "API server PID: $API_PID"
bun run dev
