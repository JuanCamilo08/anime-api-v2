FROM node:lts-alpine3.11

WORKDIR /api

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "start-dev" ]

