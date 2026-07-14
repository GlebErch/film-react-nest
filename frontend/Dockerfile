# build
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci && npm install @rollup/rollup-linux-x64-musl --no-save

COPY . .
RUN npm run build

# runtime: copy dist into shared volume for nginx
FROM alpine:3.20 AS production
WORKDIR /app

COPY --from=build /app/dist ./dist
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN sed -i 's/\r$//' /docker-entrypoint.sh && chmod +x /docker-entrypoint.sh

CMD ["/docker-entrypoint.sh"]
