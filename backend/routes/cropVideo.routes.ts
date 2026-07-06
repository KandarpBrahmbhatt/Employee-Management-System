import express from "express";
import { videoCrop } from "../controller/cropVideo.controller";
import upload from "../middleware/multer.middleware";

const VideoRoutes = express.Router();

VideoRoutes.post("/crop-video",upload.single("video"),videoCrop);

export default VideoRoutes;