FROM composer as composer
WORKDIR /deps
RUN --mount=type=bind,source=composer.json,target=composer.json \
    --mount=type=bind,source=composer.lock,target=composer.lock \
    apk upgrade && apk add git unzip \
    && composer install --no-scripts --ignore-platform-reqs

FROM php:8.3 as dev
RUN pecl install redis \
    && docker-php-ext-install pdo_mysql sockets \
    && docker-php-ext-enable redis
WORKDIR /www/app
COPY --from=composer /usr/bin/composer /usr/bin/composer
COPY --chown=unit:unit --from=composer /deps .
COPY --chown=unit:unit . .
RUN composer check-platform-reqs \
    && composer run-script post-autoload-dump \
    && composer dump-autoload
EXPOSE 8000
CMD [ "php", "artisan", "serve", "--host=0.0.0.0" ]

FROM unit:php8.3 as prod
RUN pecl install redis \
    && docker-php-ext-install pdo_mysql sockets \
    && docker-php-ext-enable redis
WORKDIR /www/app
COPY --from=composer /usr/bin/composer /usr/bin/composer
COPY --chown=unit:unit --from=composer /deps .
COPY --chown=unit:unit . .
COPY --chown=unit:unit unit.json /docker-entrypoint.d/config.json
RUN composer check-platform-reqs \
    && composer run-script post-autoload-dump \
    && composer dump-autoload
EXPOSE 80