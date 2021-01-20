FROM node:14-slim

WORKDIR /usr/src/server

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 5001

ENTRYPOINT [ "yarn" ]
