# Install dependencies only when needed
FROM node:18-alpine AS deps

# Set working directory
WORKDIR /app

# Copy package.json and lock files to install dependencies
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:18-alpine AS builder

WORKDIR /app

COPY . .

COPY --from=deps /app/node_modules ./node_modules

# Accept build argument for the API URL
ARG NEXT_PUBLIC_EMAIL_API_URL

# Set environment variable for Next.js build
ENV NEXT_PUBLIC_EMAIL_API_URL=${NEXT_PUBLIC_EMAIL_API_URL}

# Build the Next.js app
RUN yarn build

# Production image, copy all the files and run next
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

# Copy built files from builder
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Set the port environment variable
ENV PORT 80

# Expose the port
EXPOSE 80

# Start the Next.js app
CMD ["yarn", "start"]