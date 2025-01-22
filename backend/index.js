import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import emailRoutes from "./routes/email.route.js";

import connectToDB from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(cors());

app.use("/api/emails", emailRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
  connectToDB();
});
