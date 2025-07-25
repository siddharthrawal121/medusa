### Dockerfile for Medusa Backend

```dockerfile
# Use Node.js LTS on Alpine for a lightweight image
FROM node:lts-alpine

# Create app directory
WORKDIR /app

# Copy package metadata and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Build the Medusa project
RUN npm run build

# Expose the Medusa default port
EXPOSE 9000

# Set environment variable for worker mode
ENV MEDUSA_WORKER_MODE=server

# Start the Medusa server
CMD ["npm", "run", "start"]
