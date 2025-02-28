FROM node:23-alpine

WORKDIR /app

COPY ../backend/package*.json ./

RUN npm install

COPY ../backend .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]