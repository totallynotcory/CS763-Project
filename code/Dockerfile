# Use the official Node.js image.
# https://hub.docker.com/_/node
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the React app
RUN npm run build

# Use an official Nginx image as a base
FROM nginx:alpine

# Copy the Nginx template configuration
COPY nginx.conf.template /etc/nginx/nginx.conf.template

# Copy your web files to the container
COPY --from=build /app/build /usr/share/nginx/html

# Use an entrypoint script to substitute environment variables and start Nginx
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Specify the entrypoint
ENTRYPOINT ["/entrypoint.sh"]