# Use the official Node.js image based on Alpine
FROM node:current-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the project
RUN npm run build

# Remove the src directory and node_modules directory
RUN rm -rf src node_modules

# Install only production dependencies
RUN npm install --production

# Expose port 4000
EXPOSE 4000

# Start the application
CMD ["npm", "run", "start"]
