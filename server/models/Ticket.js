import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
  },
  { timestamps: true } // automatically adds createdAt and updatedAt
);

// Mongoose automatically adds _id (ObjectId) as the unique identifier for each document
const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
