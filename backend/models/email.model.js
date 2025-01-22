import mongoose from "mongoose";

const emailTemplateSchema = new mongoose.Schema({
  title: String,
  content: String,
  imageUrl: String,
});

const EmailTemplate = mongoose.model("EmailTemplate", emailTemplateSchema);

export default EmailTemplate;
