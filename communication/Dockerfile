FROM node:16

WORKDIR /home/node/app/communication

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3002

CMD [ "yarn", "start" ]
