FROM alpine:latest

RUN apk --no-cache add nodejs

WORKDIR /home/frontend
COPY package.json .
COPY package-lock.json .
COPY jsconfig.json .
COPY ./src src/
COPY ./public public/
RUN apk add npm
RUN npm install
RUN npm run build

CMD ["npm", "run", "serve"]
