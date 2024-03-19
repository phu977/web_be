import express from "express";
import {
  createParentType,
  getParentType,
} from "../Controllers/ParentType.controller.js";
import { keyApi } from "../config/jwt.js";

const ParentType = express.Router();

ParentType.post("/create", createParentType);
ParentType.get("/list", keyApi, getParentType);

export default ParentType;
