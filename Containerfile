# syntax=docker/dockerfile:1

FROM node:18-alpine AS build
WORKDIR /app

ARG REACT_APP_DOMAIN=poker4.fun
ARG REACT_APP_SOCKET_SERVER_URL=https://api.poker4.fun/
ARG REACT_APP_DOMAIN_EXPIRY_DATE="Jul 23, 2020"
ENV REACT_APP_DOMAIN=${REACT_APP_DOMAIN} \
    REACT_APP_SOCKET_SERVER_URL=${REACT_APP_SOCKET_SERVER_URL} \
    REACT_APP_DOMAIN_EXPIRY_DATE=${REACT_APP_DOMAIN_EXPIRY_DATE}

ENV NODE_OPTIONS=--openssl-legacy-provider

COPY package.json yarn.lock ./
RUN corepack enable && yarn install --frozen-lockfile

COPY public ./public
COPY src ./src
COPY config ./config
COPY scripts ./scripts

RUN yarn build

FROM nginx:1.27-alpine AS runtime

ENV NODE_ENV=production

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
