FROM node:12.7-alpine AS build-stage
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.17.1-alpine
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /usr/src/app/dist/resx-translator /usr/share/nginx/html
