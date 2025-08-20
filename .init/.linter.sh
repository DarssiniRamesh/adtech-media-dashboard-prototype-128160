#!/bin/bash
cd /home/kavia/workspace/code-generation/adtech-media-dashboard-prototype-128160/dashboard_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

