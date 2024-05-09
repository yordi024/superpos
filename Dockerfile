FROM php:8.2-fpm

# Install Nginx and other dependencies
RUN apt-get update && apt-get install -y \
    nginx \
    curl \
    libzip-dev \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql intl zip mbstring exif pcntl bcmath gd

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Remove default Nginx configuration if it exists
RUN if [ -f /etc/nginx/sites-enabled/default ]; then rm /etc/nginx/sites-enabled/default; fi

# Set working directory
WORKDIR /var/www/html

# Copy project files
COPY . .

# Set permissions for Laravel project directory
RUN chown -R www-data:www-data /var/www/html
RUN chmod -R 755 /var/www/html/storage
RUN chmod -R 775 /var/www/html/storage/logs   # Set permissions for logs directory

# Install composer dependencies
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install

# Expose port 8000
EXPOSE 8000

# Start PHP-FPM and Nginx
CMD php-fpm -F && nginx -g "daemon off;"
