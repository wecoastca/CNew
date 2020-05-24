import * as express from "express";

const api = express.Router();

api.get("/", (req: express.Request, res: express.Response) => {
  res.json({ message: "Entry in api" });
});

export default api;
