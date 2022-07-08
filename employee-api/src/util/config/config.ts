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

const MONGO_USERNAME = process.env.dbUser || "test";
const MONGO_PASSWORD = process.env.dbPwd || "test";
const MONGO_AUTH_SOURCE =  process.env.MONGO_AUTH_SOURCE || "test";
const MONGO_TABLE_NAME = process.env.MONGO_TABLE_NAME || "test";
const MONGO_INITDB_ROOT_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME || 'test';
const MONGO_INITDB_ROOT_PASSWORD= process.env.MONGO_INITDB_ROOT_PASSWORD || 'test';
const MONGO_INITDB_DATABASE = process.env.MONGO_INITDB_DATABASE || 'test';
const MONGO_PORT = process.env.MONGO_PORT || '27017';
const MONGO_HOST =
  process.env.MONGO_URL || `${SERVER_HOSTNAME}:${MONGO_PORT}/${MONGO_TABLE_NAME}?authSource=${MONGO_TABLE_NAME}&readPreference=primary`;

const MONGO = {
  host: MONGO_HOST,
  password: MONGO_PASSWORD,
  username: MONGO_USERNAME,
  port: MONGO_PORT,
  options: MONGO_OPTIONS,
  authSource: MONGO_AUTH_SOURCE,
  tableName: MONGO_TABLE_NAME,
  initRootUserName: MONGO_INITDB_ROOT_USERNAME,
  initRootPassword: MONGO_INITDB_ROOT_PASSWORD,
  initDatabase: MONGO_INITDB_DATABASE,
  url: `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`
};

const config = {
  mongo: MONGO,
  server: SERVER,
};

export default config;
