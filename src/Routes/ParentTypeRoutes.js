import express from "express";
import { createParentType } from "../Controllers/ParentType.controller.js";

const ParentType = express.Router();

ParentType.post("/create", createParentType);

export default ParentType;
