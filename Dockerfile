# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

FROM node:12

# Create app directory
WORKDIR /usr/src/blocks

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "npm", "run", "start" ]