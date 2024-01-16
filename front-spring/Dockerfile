# Stage 1: Build the application with Node.js
FROM node:21.1.0-alpine as builder 
WORKDIR /app 
COPY . .  
RUN npm install

# Assuming Vite handles the build internally
CMD ["npm", "run", "dev"]
