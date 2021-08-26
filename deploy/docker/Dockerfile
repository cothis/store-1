# Install Dependencies only when needed
FROM node:14-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY ../../server/package.json ../../server/yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:14-alpine AS builder
WORKDIR /app
COPY ../../server .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build

# Production image, copy all the files and run node
FROM node:14-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S woowa -u 1001

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/ormconfig.js ./
COPY --from=builder /app/ormconfig.seed.js ./
COPY ../../deploy/docker/entrypoint.sh ./
RUN chown woowa:nodejs ./entrypoint.sh 
RUN chmod +x ./entrypoint.sh
# RUN apk add --no-cache --upgrade bash

# mysql service 대기를 위한 dockerize 설치
ENV DOCKERIZE_VERSION v0.6.1  
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \  
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz


USER woowa
ENTRYPOINT [ "sh", "./entrypoint.sh" ]