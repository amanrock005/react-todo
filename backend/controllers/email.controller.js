import cloudinary from "../lib/cloudinary.js";
import EmailTemplate from "../models/email.model.js";

export const getEmailLayouts = async (req, res) => {
  try {
    const templates = await EmailTemplate.find(); // Fetch all templates
    res.status(200).json(templates); // Return templates as JSON
  } catch (error) {
    console.error("Error fetching templates:", error);
    res.status(500).send({ error: "Failed to fetch templates" });
  }
};

export const uploadImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    res.json({ imageUrl: result.secure_url });
  } catch (err) {
    res.status(500).json({ error: "image upload failed" });
  }
};

export const uploadEmailConfig = async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;
    const newTemplate = new EmailTemplate({ title, content, imageUrl });
    await newTemplate.save();
    res.status(201).json(newTemplate);
  } catch (err) {
    res.status(500).json({ error: "failed to save template" });
  }
};
