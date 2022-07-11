import http from "http";
import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";

import logging from "./util/config/logging";
import config from "./util/config/config";
import employeeRoutes from "./routes/employee.route";

const NAMESPACE = "Server";

const app: Application = express();

/** Parse the body of the request */
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(express.json());
app.use(cors());

/** Connect to Mongo */
mongoose
  .connect(config.mongo.url, config.mongo.options)
  .then((result) => {
    logging.info(NAMESPACE, "Mongo connected successfully..");
  })
  .catch((error) => {
    logging.error(NAMESPACE, error.message, error);
  });

app.use((req, res, next) => {
  logging.info(
    NAMESPACE,
    `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
  );
  res.on("finish", () => {
    logging.info(
      NAMESPACE,
      `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
    );
  });
  next();
});

/** Rules of our API */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Multipart/Form-Data"
  );

  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

/** Routes */
app.use("/api/v1/employee", employeeRoutes);

/** Error handling */
app.use((req, res, next) => {
  const error = new Error("Not found");
  res.status(404).json({
    message: error.message,
    status: 404,
  });
});

const httpServer = http.createServer(app);
httpServer.listen(config.server.port, () =>
  logging.info(
    NAMESPACE,
    `Server is running on ${config.server.hostname}:${config.server.port}`
  )
);

export default { httpServer };