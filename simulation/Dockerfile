FROM node:16

WORKDIR /var/www/backend

COPY . .

RUN npm install

EXPOSE 8080

CMD [ "npm", "run", "dev" ]