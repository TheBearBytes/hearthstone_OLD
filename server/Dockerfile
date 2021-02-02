FROM node:14.15.4-alpine3.10

WORKDIR /usr/src/server

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 5001

ENTRYPOINT [ "yarn" ]
