### TechnoStrelka2025 selection task
#### Router! Travel site. You can create your own route and publish it, as well as see the routes of other authors.


##### Build project:
To build the project, you will need docker, Download it from the official website https://www.docker.com/ and install it/

Run the project build:
```
docker compose build
```
In some versions of docker, you need to use the docker-compose command instead of the docker compose command.

Create tables in the database:
```
docker compose run --rm web-app sh -c "python3 manage.py migrate"
```

Create a user for the admin panel:
```
docker compose run --rm web-app sh -c "python3 manage.py createsuperuser"
```
Run the app:Launch the app:

```
docker compose up
```
The frontend is now available on http://localhost8060/ , and the backend on http://localhost:8001/

To use the project in production, you may need to change the server URL used by the frontend application. If necessary, the URL is at the beginning of the front-end/services/HttpClient file.js may also need editing. back-end/Map/Map/settings.py
