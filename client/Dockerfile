FROM node:14.15.4-alpine3.10
RUN apk update && apk add python3 make g++

WORKDIR /usr/src/client

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3001

ENTRYPOINT [ "yarn" ]
