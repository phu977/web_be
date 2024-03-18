import express from "express";
import { login, signUp } from "../Controllers/User.controller.js";

const UserRoutes = express.Router();

UserRoutes.post("/signup", signUp);
UserRoutes.post("/login", login);

export default UserRoutes;
