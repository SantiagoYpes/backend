import { Schema, model } from "mongoose";

// If I want that the title be a primary key
const userSchema = new Schema(
  {
    ced: {
      type: String,
      require: true,
      trim: true,
    },
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    user: {
        type: String,
        require: true,
      },
    signed: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("LogContract", userSchema);
