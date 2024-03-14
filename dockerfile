# Set the base image to Node 21
FROM node:21-alpine

# Set the working directory
WORKDIR /app

# Copy the current directory contents to /app
COPY package*.json ./

# Install needed packages specified in package.json
RUN npm install

# Copy the current directory contents to /app
COPY . .

# Set the environment variable
ENV PORT=3000

# Make port 3000 available to outside the container
EXPOSE 3000

# Run the app
CMD [ "npm", "start" ]