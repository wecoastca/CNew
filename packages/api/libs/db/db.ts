import mongoose from "mongoose";
import logger from "../log";
import config from "../config";

const options = {
  user: config.get("mongoose:username"),
  pass: config.get("mongoose:password"),
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect(config.get("mongoose:uri"), options);

let db = mongoose.connection;

db.on("err", () => logger.info("Failed connect to MongoDB"));
db.once("open", () => logger.info("Successful connection to MongoDB"));

export default mongoose;
