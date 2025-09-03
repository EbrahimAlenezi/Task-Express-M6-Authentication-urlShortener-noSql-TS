import dotenv from "dotenv";
dotenv.config;

const PORT = process.env.PORT || 8000;
const Mongoo_DB_CONN = process.env.Mongoo_DB_CONN;
const JWT_EXP = process.env.JWT_EXP;
const JWT_SECRET = process.env.JWT_SECRET;

if (!Mongoo_DB_CONN) {
  console.error("No Mongo coneection string");
  process.exit(1);
}
export default {
  PORT,
  Mongoo_DB_CONN,
  JWT_EXP,
  JWT_SECRET,
};
