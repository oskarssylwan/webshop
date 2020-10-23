FROM alpine:latest

RUN apk --no-cache add nodejs

WORKDIR /home/api
COPY package.json .
COPY package-lock.json .
RUN apk add npm
RUN npm install
COPY . .

CMD ["npm", "start"]
