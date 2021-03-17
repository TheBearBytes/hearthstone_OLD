# Hearthstone - wip

This is a project to learn some JS stuff like GraphQL (with both - Apollo Server and Client), SSR with NextJS and ExpressJS, standalone NodeJS service - all dockerized and hosted on VPN (nginx).

## TODO:
- prod docker-compose
- mongodb user/password
- logs
- linters!

## Highlighting

- [x] react hooks
- [x] redux & redux dev tools
- [ ] formik & yup validation
- [x] material ui  
- [x] next (ssr and ssg pages) with express
- [ ] passport auth (custom, google, fb)
- [ ] i18n
- [x] graphql powered by Apollo (client and server)
- [x] typescript
- [x] mongodb
- [x] docker-compose
- [ ] deployed on VPS
- [ ] ngnix

## Run

Change name of `.env.example` to `.env` in `client` and enter your keys.

To populate database run `docker exec -it hs-client yarn populateDb` on running project.

### Development

`docker-compose  -f docker-compose.yml -f docker-compose.dev.yml up`

### Production

 1. Run development: `docker-compose  -f docker-compose.yml -f docker-compose.dev.yml up`.
 2. Enter client container to build NextJS app (development is required for SSG from database): `docker exec -it hs-client /bin/sh`.
 3. Build client: `yarn build` (Next requires database etc. to generate SSG during building process).
 4. After build, exit client (`exit`) and stop development `docker-compose  -f docker-compose.yml -f docker-compose.dev.yml stop`.
5. Finally run: `docker-compose  -f docker-compose.yml -f docker-compose.prod.yml up` to run built app.

## Some links:
* [Simple MERN docker-compose - YT](https://www.youtube.com/watch?v=0B2raYYH2fE&ab_channel=DevOpsDirective)
* [NodeJS Microservices - YT](https://www.youtube.com/watch?v=EsCfPxjmnjo&ab_channel=FredrikChristenson)
* [JWT](https://www.youtube.com/watch?v=RUZB8tpyDbQ&ab_channel=BenAwad)
* [MongoDB lookup](https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/)