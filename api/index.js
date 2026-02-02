import serverless from "serverless-http";
import app from "../src/app.js";
import { dbConnect } from "../src/config/db.js";

let connected = false;
const handler = serverless(app);

export default async function (req, res) {
  if (!connected) {
    try {
      await dbConnect();
      connected = true;
    } catch (err) {
      console.error("DB connection error:", err);
      res.statusCode = 500;
      res.end("Database connection error");
      return;
    }
  }
  return handler(req, res);
}
