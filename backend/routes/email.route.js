import express from "express";
import multer from "multer";
import {
  getEmailLayouts,
  uploadImage,
  uploadEmailConfig,
} from "../controllers/email.controller.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/getEmailLayout", getEmailLayouts);
router.post("/uploadImage", upload.single("image"), uploadImage);
router.post("/uploadEmailConfig", uploadEmailConfig);

export default router;
