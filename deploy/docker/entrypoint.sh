#!/bin/sh

dockerize -wait tcp://db:3306 -timeout 60s
echo "Apply database migration!"
node ./node_modules/typeorm-seeding/dist/cli.js seed -n ormconfig.seed.js
NODE_ENV=production node dist/src/main