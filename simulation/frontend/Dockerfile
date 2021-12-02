FROM node:16

WORKDIR /home/node/app/frontend

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 5000

CMD [ "yarn", "start" ]
