FROM node:alpine
RUN mkdir /peer-server
WORKDIR /peer-server
COPY bin ./bin
COPY dist ./dist
COPY package.json .
RUN npm install --production
EXPOSE 9000
ENTRYPOINT ["node", "bin/peerjs"]
CMD [ "--port", "9000", "--sslkey", "/etc/letsencrypt/live/codetalk.pro/privkey.pem", "--sslcert", "/etc/letsencrypt/live/codetalk.pro/cert.pem" ]
