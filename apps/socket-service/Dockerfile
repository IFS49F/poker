FROM node:lts-alpine as deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app
COPY --chown=node:node dist/apps/socket-service/package*.json ./
RUN npm ci --only=production && npm cache clean --force

FROM node:lts-alpine as runner
RUN apk add --no-cache dumb-init
ENV NODE_ENV production
ENV REDIS_URL 'redis://redis:6379'
ENV PORT 4300
WORKDIR /usr/src/app
COPY --from=deps --chown=node:node /usr/src/app/node_modules ./node_modules
COPY --chown=node:node dist/apps/socket-service .
USER node
EXPOSE 4300
CMD ["dumb-init", "node", "main.js"]
