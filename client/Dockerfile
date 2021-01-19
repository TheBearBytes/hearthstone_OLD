FROM node:14-slim

WORKDIR /usr/src/client

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3001

CMD [ "yarn", "dev" ]