# ─────────────────────────────────────────────────────────────
#  ShoeStop – Backend Dockerfile (Production-ready)
# ─────────────────────────────────────────────────────────────

# Stage 1: Dependency installation
FROM node:18-alpine AS deps

WORKDIR /app

# Copy package files first for layer caching
COPY package*.json ./

# Install ONLY production dependencies
RUN npm ci --only=production

# ─────────────────────────────────────────────────────────────
# Stage 2: Final runtime image
FROM node:18-alpine AS runner

# Create non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy production node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy application source code
COPY . .

# Remove any committed .env file (secrets come from docker-compose / runtime env)
RUN rm -f .env

# Change ownership to non-root user
RUN chown -R appuser:appgroup /app

USER appuser

# Expose the backend port
EXPOSE 5000

# Health check: ping the root endpoint
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/ || exit 1

# Start the Express server (use node, NOT nodemon in production)
CMD ["node", "server.js"]
