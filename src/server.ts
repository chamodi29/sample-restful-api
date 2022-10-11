import express from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config/config";
import Logging from "./library/Logging";
import studentRoutes from "./routes/Student";
import subjectRoutes from "./routes/Subject";

const router = express();

/* Connection to MongoDB */
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    Logging.info("connected to the MongoDB");
    StartServer();
  })
  .catch((error) => {
    Logging.error("Unable to connect: ");
    Logging.error(error);
  });

/* If MongoDB connects, start server */
const StartServer = () => {
  router.use((req, res, next) => {
    /* Log the request */
    Logging.info(
      `Incomming -> method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );

    res.on("finish", () => {
      /* Log the response */
      Logging.info(
        `Incomming -> method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress} - Status: [${res.statusCode}]`
      );
    });

    next();
  });

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  /** Rules of API */
  router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method == "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
      return res.status(200).json({});
    }

    next();
  });

  /** Routes */
  router.use("/students", studentRoutes);
  router.use("/subjects", subjectRoutes);

  /** HealthCheck */
  router.get("/ping", (req, res, next) =>
    res.status(200).json({ message: "pong" })
  );

  /** Error handling */
  router.use((req, res, next) => {
    const error = new Error("Not Found");
    Logging.error(error);

    return res.status(404).json({
      message: error.message,
    });
  });

  http
    .createServer(router)
    .listen(config.server.port, () =>
      Logging.info(`Server is Running on port ${config.server.port}`)
    );
};
