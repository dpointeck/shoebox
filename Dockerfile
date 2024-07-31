# Composer stage
FROM composer:2 AS composer
WORKDIR /app
COPY . .
RUN composer install --no-scripts --no-autoloader
RUN composer dump-autoload --optimize

# Node.js stage
FROM node:22 AS node
WORKDIR /app
COPY . .
RUN mv .env.staging .env
RUN npm ci
COPY --from=composer /app/vendor ./vendor

# Ensure the build directory exists
RUN mkdir -p public
RUN npm run build

# Final PHP stage
FROM php:8.3-cli-bookworm AS php

WORKDIR /app

# Copy built assets from node stage
COPY --from=node /app/public /app/public

# Copy composer files and run autoloader
COPY --from=composer /app/vendor /app/vendor
COPY . .
RUN mv .env.staging .env
RUN mkdir -p /var/lib/sqlite
VOLUME /var/lib/sqlite
RUN touch /var/lib/sqlite/database.sqlite
ENV DB_DATABASE=/var/lib/sqlite/database.sqlite
RUN php artisan migrate && php artisan optimize:clear && php artisan key:generate
EXPOSE 8000
CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]
