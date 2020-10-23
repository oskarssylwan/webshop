FROM node:11-alpine

WORKDIR /home/api
COPY package.json .
COPY package-lock.json .
RUN apk add --no-cache make gcc g++ python && \
  npm install && \
  apk del make gcc g++ python

COPY src/ src/

CMD ["npm", "start"]
