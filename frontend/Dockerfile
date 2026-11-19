# ─────────────────────────────────────────────────────────────
#  ShoeStop – Frontend Dockerfile (Multi-stage)
# ─────────────────────────────────────────────────────────────

# Stage 1: Build the React application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files for layer caching
COPY package*.json ./

# Install ALL dependencies (including devDependencies for Vite build)
RUN npm ci

# Accept the backend API URL as a build argument
ARG VITE_API_URL=http://localhost:5000
ENV VITE_API_URL=$VITE_API_URL

# Copy all source files
COPY . .

# Build the production bundle
RUN npm run build

# ─────────────────────────────────────────────────────────────
# Stage 2: Serve with Nginx (tiny image ~23MB total)
FROM nginx:1.25-alpine AS runner

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy our custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built React app from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
