# ℹ️ README:
# Runs the whole project 

echo "--------> Creating new MongoDB, running the API and the frontend <--------"

cd mongo-db
echo "Creating MongoDB instance.."
MONGO_DB_USER=dbuser MONGO_DB_USER_PASSWORD=testing d=admin MONGO_INITDB_ROOT_USERNAME=root MONGO_INITDB_ROOT_PASSWORD=testing ef=.env docker-compose up -d --remove-orphans &
wait


cd ..
cd employee-api
echo "Running the API.."
nohup npm install && npm run start:dev & 

cd ..
cd employee-ui
echo "Running the UI.."
npm install && ng serve &
wait


echo "--------> DONE <--------"
