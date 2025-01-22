import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGOURI);
    console.log(conn.connection.host);
  } catch (err) {
    console.log("error connecting to DB");
    process.exit(1);
  }
};

export default connectToDB;
