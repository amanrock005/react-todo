import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import emailRoutes from "./routes/email.route.js";

import connectToDB from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/api/emails", emailRoutes);

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
  connectToDB();
});
