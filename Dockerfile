# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code, including the src folder
COPY . .

# Optionally, copy .env file if you're using it
COPY src/.env .env

# Expose the port the app runs on
EXPOSE 3000

# Define the command to start the app
CMD ["node", "src/app.js"]
