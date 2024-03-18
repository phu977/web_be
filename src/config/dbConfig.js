import dotenv from "dotenv";
dotenv.config(); // thư viện sẽ load value trong file .env

const dbConfig = {
  url: process.env.DATABASE_URL,
  secret: process.env.SECRET,
};
export { dbConfig };
