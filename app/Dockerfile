ARG NODE_VERSION=22.4.0

FROM node:lts-alpine as base

FROM base as dev
ENV NODE_ENV=development
WORKDIR /app
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --include=dev
COPY . .
EXPOSE 5173
CMD [ "npm", "run", "dev"]

FROM base as build
ENV NODE_ENV=production
WORKDIR /build
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --include=dev
COPY . .
RUN npm run build

FROM unit:latest as prod
WORKDIR /www/static
COPY --chown=unit:unit nginx.conf.json /docker-entrypoint.d/config.json
COPY --chown=unit:unit --from=build /build/dist/ .
RUN ln -sf /dev/stdout /var/log/access.log
EXPOSE 80