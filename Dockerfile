FROM node:latest

COPY ./index.js /app/
COPY ./package.* /app/
WORKDIR /app

RUN npm install
# RUN npm install --only=production

CMD ["npx", "nodemon", "index.js"]
# CMD ["node", "www/main.js"]