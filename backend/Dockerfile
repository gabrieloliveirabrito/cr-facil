FROM php:8.0-apache
ARG UID=root
ARG GID=root
ARG USER

WORKDIR /var/www/html/

COPY php.ini /usr/local/etc/php/
COPY src/ /var/www/html/

RUN apt-get update && apt-get install -y libbz2-dev libonig-dev
RUN docker-php-ext-install mbstring fileinfo
RUN docker-php-ext-install mysqli pdo pdo_mysql
RUN if command -v a2enmod >/dev/null 2>&1; then \
    a2enmod rewrite headers \
    ;fi

RUN chown -R ${UID}:${GID} /var/www/html
VOLUME /var/www/html
USER ${UID}