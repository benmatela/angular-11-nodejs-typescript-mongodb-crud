## Employeedb

This project is generated using ([docker](https://docker.com) version 20.10.12, build e91ed57) and 
([docker-compose](https://docker.com) version 1.29.2, build 5becea4c)

# Environment variables
This project uses the following environment variables:

| Name                          | Description                         | Default Value                                  |
| ----------------------------- | ------------------------------------| -----------------------------------------------|
|MONGO_INITDB_ROOT_USERNAME           | Mongo DB value            | "root"     |
|MONGO_INIT_ROOT_PASSWORD           | Mongo DB value            | "testing"      |
|MONGO_INITDB_DATABASE           | Mongo DB value            | "admin"      |
|MONGO_DB_USER           | Mongo DB value            | "dbuser"      |
|MONGO_DB_USER_PASSWORD           | Mongo DB value            | "testing"      |

## Description

Docker-Compose and Bash script used to kick-start a new database.

# Pre-requisites
- Install ([docker](https://docker.com) version 20.10.12, build e91ed57) and 
([docker-compose](https://docker.com) version 1.29.2, build 5becea4c)

# Getting started
- Clone the repository
```
git clone  <git lab template url> <project_name>
```

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **mondo-db**/docker-compose                 | Orchestrates the creation of a new database.  |
| **mongo-db**/users_init.sh      | Runs bash script to create users and the database

```bash
# Runs "users_init.sh". Replace values with own details
# Do not use default environments for production

$ sudo MONGO_DB_USER=dbuser MONGO_DB_USER_PASSWORD=testing MONGO_INITDB_DATABASE=admin MONGO_INITDB_ROOT_USERNAME=root MONGO_INITDB_ROOT_PASSWORD=testing ef=.env docker-compose up -d --remove-orphans
```

### How it works:

* Creates a new MongoDB instance using Docker Compose


## Testing the database

```bash
# Check if it's running. It should be found on port 27017
$ docker-ps
# DB endpoint: `http://0.0.0.0:27017`
```

