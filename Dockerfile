FROM node:10 AS base

WORKDIR /usr/src/app

FROM base AS dependencies  

COPY package*.json ./

RUN npm install --only=production

COPY . .

EXPOSE 4001

CMD ["node", "index.js"]