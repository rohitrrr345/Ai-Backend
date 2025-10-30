# Use an official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of your app
COPY . .

# Set environment variable defaults
ENV PORT=5000
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
