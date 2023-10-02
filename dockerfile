# (1)
FROM node:20.4.0-bookworm-slim as base
WORKDIR /src
# (2)
RUN [ "npm", "install", "-g", "npm@9.8.0" ]

FROM base as dev
ENV NODE_ENV=development
COPY ./src/package*.json ./
# (3)
RUN [ "npm", "install" ]