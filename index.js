import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { dbConfig } from "./src/config/dbConfig.js";
import rootRoutes from "./src/Routes/rootRoutes.js";

const app = express();
const port = 3005;
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url);
mongoose.connection.once("open", function () {
  console.log("Successfully connected to the database");
});
app.use(express.json()); // middleware parse body string -> body json
app.use(cors()); // cho tất cả các request (FE) từ bên ngoài vào để tương tác vs BE

app.use(rootRoutes);

app.listen(port, () => {
  console.log(`BE starting ${port}`);
});
