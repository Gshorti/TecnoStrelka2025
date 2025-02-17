FROM alt:p11

COPY requirements.txt /temp/requirements.txt
COPY Map /Map
WORKDIR /Map
EXPOSE 8000

RUN apt-get update
RUN apt-get install python3 pip postgresql17 python3-module-psycopg2 -y
RUN pip install -r /temp/requirements.txt

RUN adduser service-user

USER service-user
