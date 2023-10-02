import * as dotenv from "dotenv";
dotenv.config();

export default [
  "http://localhost:4173",
  process.env.CLIENT_ORIGIN_URL,
];