import express from "express";
import storage from "../Controllers/UploadImage.controller.js";
import { uploadSingleAvatar } from "../Controllers/User.controller.js";

const ImageRoutes = express.Router();

ImageRoutes.post("/upload_image", storage.single("file"), uploadSingleAvatar);

export default ImageRoutes;
