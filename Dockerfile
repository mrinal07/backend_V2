# Use an official base image (e.g., Node.js or Python depending on your server)
FROM node

# Set the working directory
WORKDIR /app

# Copy all files to the working directory
COPY . .

# Install dependencies (if applicable)
RUN npm install

# Expose port 5000
EXPOSE 5000

# Run the server (assuming it's a Node.js app)
CMD ["npm", "start"]
