FROM node:18 AS build

WORKDIR /app

COPY ../frontend/package*.json ./

RUN npm install

COPY ../frontend .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80