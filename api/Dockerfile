# Dockerfile for the API server
FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3100

CMD ["npm", "start"]