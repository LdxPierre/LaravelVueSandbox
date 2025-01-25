ARG NODE_VERSION=22.4
ARG PNPM_VERSION=9.15.4

FROM node:lts-alpine as base
RUN corepack enable && corepack use pnpm@9.15.4

FROM base as dev
ENV NODE_ENV=development
WORKDIR /app
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,target=/.pnpm \
    pnpm install
COPY . .
EXPOSE 5173
CMD [ "pnpm", "run", "dev"]

FROM base as build
ENV NODE_ENV=production
WORKDIR /build
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --include=dev
COPY . .
RUN pnpm run build

FROM unit:latest as prod
WORKDIR /www/static
COPY --chown=unit:unit nginx.conf.json /docker-entrypoint.d/config.json
COPY --chown=unit:unit --from=build /build/dist/ .
RUN ln -sf /dev/stdout /var/log/access.log
EXPOSE 80