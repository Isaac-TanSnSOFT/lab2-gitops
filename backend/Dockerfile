FROM node:22-alpine

WORKDIR /app

COPY backend.js .

RUN npm init -y && npm install express

EXPOSE 3000

CMD ["node", "backend.js"]

