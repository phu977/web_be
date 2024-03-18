import express from "express";
import { createRole } from "../Controllers/Role.controller.js";

const Role = express.Router();
Role.post("/createrole", createRole);

export default Role;
