import * as express from "express";
import db from "../db/db";
import Bouquet from "../model/bouquet";
import logger from "../log";

//TODO: Нужен ли post для букета
export const router = express.Router();

router.get("/", (req: express.Request, res: express.Response) => {
  Bouquet.find((err, docs) => {
    if (!err) {
      logger.info("List of bouquets was sent");
      return res.json(docs);
    } else {
      res.statusCode = 500;
      logger.error("Internal error(%d): %s", res.statusCode, err.message);

      return res.json({
        error: "Internal server Error",
        status: res.statusCode,
      });
    }
  });
});

router.get("/:id", (req: express.Request, res: express.Response) => {
  Bouquet.findById(req.params.id, (err, docs) => {
    if (!docs) {
      res.statusCode = 404;
      logger.error("There are no bouquets by ID", res.statusCode, err.message);

      return res.json({
        error: "Not Found",
        status: res.statusCode,
      });
    }
    if (!err) {
      logger.info("Bouqeut was received by ID: %d", req.params.id);
      return res.json(docs);
    } else {
      res.statusCode = 500;
      logger.error("Internal error(%d): %s", res.statusCode, err.message);

      return res.json({
        error: "Internal server Error",
        status: res.statusCode,
      });
    }
  });
});

router.delete("/:id", (req: express.Request, res: express.Response) => {
  Bouquet.findByIdAndDelete(req.params.id, (err, docs) => {
    if (!docs) {
      res.statusCode = 404;
      logger.error("There are no bouquets by ID", res.statusCode, err.message);

      return res.json({
        error: "Not found",
        status: res.statusCode,
      });
    }
    if (!err) {
      logger.info("Bouqeut was deleted by ID: %d", req.params.id);
      return res.json(docs);
    } else {
      res.statusCode = 500;
      logger.error("Internal error(%d): %s", res.statusCode, err.message);

      return res.json({
        error: "Internal server Error",
        status: res.statusCode,
      });
    }
  });
});
