# Use the official Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the entire application code to the container
COPY . .

# Build the React app for production
RUN yarn run build

# Expose port 80 for the Nginx server
EXPOSE 5173

# Start Nginx when the container runs
CMD ["yarn", "run", "dev"] 