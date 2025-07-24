FROM node:22-alpine

WORKDIR /app

COPY frontend.js .

RUN npm init -y && npm install express axios

EXPOSE 3001

CMD ["node", "frontend.js"]

