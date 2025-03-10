FROM node:20 AS build

WORKDIR /app

COPY ../frontend/package*.json ./

RUN npm install

COPY ../frontend .

RUN npm run build

FROM nginx:alpine

RUN apk update && apk upgrade

COPY ./deployment/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80