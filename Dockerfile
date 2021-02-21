FROM node:12.20.2-alpine3.12

WORKDIR /var/www

COPY . /var/www

RUN chmod -R 777 /var/www/news

RUN npm install

EXPOSE 3000

CMD ["node", "app.js"]
