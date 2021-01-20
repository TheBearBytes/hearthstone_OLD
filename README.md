# Hearthstone - wip

This is a project to learn some JS stuff like GraphQL (with both - Apollo Server and Client), SSR with NextJS and ExpressJS, standalone NodeJS service - all dockerized.

## TODO:
- prod docker-compose
- mongodb user/password

## Project

### Development

`docker-compose  -f docker-compose.yml -f docker-compose.dev.yml up`

### Production

 1. Run development: `docker-compose  -f docker-compose.yml -f docker-compose.dev.yml up`.
 2. Enter client container to build NextJS app (development is required for SSG from database): `docker exec -it hs-client bash`.
 3. Build client: `yarn build`.
 4. After build, exit client (`exit`) and stop development `docker-compose  -f docker-compose.yml -f docker-compose.dev.yml stop`.
5. Finally run: `docker-compose  -f docker-compose.yml -f docker-compose.prod.yml up` to run built app.

### Client

NextJS SSR with Express.

## Some links:
https://www.youtube.com/watch?v=0B2raYYH2fE&ab_channel=DevOpsDirective

