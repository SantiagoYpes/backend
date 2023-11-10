FROM node:18.15.0-alpine

WORKDIR /app

COPY package.json ./

RUN npm install     

COPY . .

ENV PORT=4000
CMD ["npm", "start"]

