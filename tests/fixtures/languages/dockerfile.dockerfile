# Build and run the turso-users-service

FROM node:20-alpine AS builder
ARG BUILD_ENV=production
ENV NODE_ENV=${BUILD_ENV}

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci && npm cache clean --force

COPY . .
RUN npm run build \
    && npm prune --production \
    && rm -rf src

FROM node:20-alpine AS runner
ENV PORT=8080 \
    DEFAULT_QUOTA=100

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 8080
CMD ["node", "dist/index.js"]
