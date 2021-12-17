FROM node:16

WORKDIR /home/node/app/backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]
