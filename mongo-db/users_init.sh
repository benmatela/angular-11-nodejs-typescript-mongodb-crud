#!/bin/bash
set -e

# MONGO_DB_USER is a username used from application code to interact with databases and MONGO_DB_USER_PASSWORD is the password for this user.
# MONGO_INITDB_ROOT_USERNAME & MONGO_INITDB_ROOT_PASSWORD is the config for admin.
# Admin user is expected to be already created when this script executes. We use it here to authenticate as admin to create the database user and databases.
# CMD: sudo MONGO_DB_USER=dbuser MONGO_DB_USER_PASSWORD=testing d=admin MONGO_INITDB_ROOT_USERNAME=root MONGO_INITDB_ROOT_PASSWORD=testing ef=.env docker-compose up -d --remove-orphans 
# Database Name: employeedb

echo ">>>>>>> trying to create database and users"
if [ -n "${MONGO_INITDB_ROOT_USERNAME:-}" ] && [ -n "${MONGO_INITDB_ROOT_PASSWORD:-}" ] && [ -n "${MONGO_DB_USER:-}" ] && [ -n "${MONGO_DB_USER_PASSWORD:-}" ]; then
mongo -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD<<EOF
db=db.getSiblingDB('employeedb');
use employeedb;
db.createUser({
  user:  '$MONGO_DB_USER',
  pwd: '$MONGO_DB_USER_PASSWORD',
  roles: [{
    role: 'readWrite',
    db: 'employeedb'
  }]
});
EOF
else
    echo "MONGO_INITDB_ROOT_USERNAME,MONGO_INITDB_ROOT_PASSWORD,MONGO_DB_USER and MONGO_DB_USER_PASSWORD must be provided. Some of these are missing, hence exiting database and user creatioin"
    exit 403
fi
