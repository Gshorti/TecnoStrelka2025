FROM nginx:latest
COPY . /usr/share/nginx/html
WORKDIR /usr/share/nginx/html/front-end/
EXPOSE 8001
CMD ["nginx", "-g", "daemon off;"]