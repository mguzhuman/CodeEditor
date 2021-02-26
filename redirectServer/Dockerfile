FROM node:14

WORKDIR /app/redirectServer

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node", "index.js" ]
