import cloudinary from "../lib/cloudinary.js";
import EmailTemplate from "../models/email.model.js";

export const getEmailLayout = async (req, res) => {
  const htmlTemplate = `
    <html>
    <head></head>
    <body>
    <h1>{{Title}}</h1>
    <p>{{Content}}</p>
    <img src="{{ImageUrl}}"/>
    </body>
    </html>
    `;
  res.send(htmlTemplate);
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
