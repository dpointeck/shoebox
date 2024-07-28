# Composer stage
FROM composer:2 as composer

WORKDIR /app
COPY . .
RUN composer install --no-scripts --no-autoloader
RUN composer dump-autoload --optimize

# Node.js stage
FROM node:22 as node

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
COPY --from=composer /app/vendor ./vendor

# Ensure the build directory exists
RUN mkdir -p public
RUN npm run build

# Final PHP stage
FROM php:cli-bookworm as php

WORKDIR /app

# Copy built assets from node stage
COPY --from=node /app/public /app/public

# Copy composer files and run autoloader
COPY --from=composer /app/vendor /app/vendor
COPY . .
RUN mkdir -p /var/lib/sqlite
VOLUME /var/lib/sqlite
RUN touch /var/lib/sqlite/database.sqlite
ENV DB_DATABASE=/var/lib/sqlite/database.sqlite
EXPOSE 8000
CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]
