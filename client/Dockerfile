FROM node:14-slim

WORKDIR /usr/src/client

COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./.env ./

#bcryptjs fix on linux https://github.com/kelektiv/node.bcrypt.js/issues/736#issuecomment-510285927
#RUN apk --no-cache add --virtual builds-deps build-base python
#todo probably yarn add node-gyp is the solution - check

RUN yarn install

COPY . .

EXPOSE 3001

ENTRYPOINT [ "yarn" ]
