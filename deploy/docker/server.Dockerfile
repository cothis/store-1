FROM node:14

RUN apt update && apt install -y vim
RUN npm install -g pm2
