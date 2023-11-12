import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
      //Trim is used to cut the space
      trim: true,
    },
    name: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: Number,
      require: true,
    },

  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("User", userSchema);
