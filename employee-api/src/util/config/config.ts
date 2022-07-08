import dotenv from "dotenv";

dotenv.config();

// SERVER ENVIRONMENTS
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "0.0.0.0";
const SERVER_PORT = process.env.SERVER_PORT || 3000;

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
};

// MONGO ENVIRONMENTS
const MONGO_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  socketTimeoutMS: 30000,
  keepAlive: true,
  poolSize: 50,
  autoIndex: false,
  retryWrites: false,
};

const MONGO_HOST_NAME = process.env.MONGO_HOST_NAME || "0.0.0.0";
const MONGO_DB_USER = process.env.MONGO_DB_USER || "test";
const MONGO_DB_USER_PASSWORD = process.env.MONGO_DB_USER_PASSWORD || "test";
const MONGO_AUTH_SOURCE =  process.env.MONGO_AUTH_SOURCE || "test";
const MONGO_TABLE_NAME = process.env.MONGO_TABLE_NAME || "test";
const MONGO_INITDB_ROOT_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME || 'test';
const MONGO_INITDB_ROOT_PASSWORD= process.env.MONGO_INITDB_ROOT_PASSWORD || 'test';
const MONGO_INITDB_DATABASE = process.env.MONGO_INITDB_DATABASE || 'test';
const MONGO_PORT = process.env.MONGO_PORT || '27017';
const MONGO_HOST =
  process.env.MONGO_URL || `${MONGO_HOST_NAME}:${MONGO_PORT}/${MONGO_TABLE_NAME}?authSource=${MONGO_AUTH_SOURCE}&readPreference=primary`;

const MONGO = {
  hostName: MONGO_HOST_NAME,
  password: MONGO_DB_USER_PASSWORD,
  userName: MONGO_DB_USER,
  port: MONGO_PORT,
  options: MONGO_OPTIONS,
  authSource: MONGO_AUTH_SOURCE,
  tableName: MONGO_TABLE_NAME,
  initRootUserName: MONGO_INITDB_ROOT_USERNAME,
  initRootPassword: MONGO_INITDB_ROOT_PASSWORD,
  initDatabase: MONGO_INITDB_DATABASE,
  url: `mongodb://${MONGO_DB_USER}:${MONGO_DB_USER_PASSWORD}@${MONGO_HOST}`
};

const config = {
  mongo: MONGO,
  server: SERVER,
};

export default config;
