FROM alt:p11

COPY . /var/www/html
COPY ./sites-enabled.d/site.conf /etc/nginx/sites-enabled.d/
WORKDIR /
EXPOSE 8000

RUN apt-get update
RUN apt-get install nginx -y
CMD echo qq
