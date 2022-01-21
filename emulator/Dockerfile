# Specify a base image
FROM node:alpine

#Install some dependencies
WORKDIR /emulator
COPY ./ /emulator
RUN npm install

# Set up a default command
CMD [ "npm","start" ]