import express from "express";
import { createGroupRole } from "../Controllers/GroupRole.controller.js";

const GroupRole = express.Router();
GroupRole.post("/createrolegroup", createGroupRole);
export default GroupRole;
