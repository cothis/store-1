#!/bin/bash
PROJECT_PATH=/home/ubuntu/store-1-production
cd ${PROJECT_PATH}
docker-compose down
docker-compose up -d --build
