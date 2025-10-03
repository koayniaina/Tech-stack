import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Ticket from './routes/Ticket.js';
import User from  './routes/User.js'
const app = express();

app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 5000;
// routes
app.use("/user", User);
app.use("/ticket", Ticket);

app.listen(PORT, () => {
  connectDB();
  console.log(`This is running on port ${PORT}`);
});
