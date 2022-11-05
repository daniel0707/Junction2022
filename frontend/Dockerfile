FROM node:lts-alpine as builder

COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine

# copy the .conf template
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page and replace it with the static files we created in the first step
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /dist /usr/share/nginx/html
EXPOSE 8080