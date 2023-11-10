import { Schema, model } from "mongoose";
//import { transformAuthInfo } from "passport";

// If I want that the title be a primary key
const userSchema = new Schema(
  {
    ced: {
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
    lastname: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    valuehour: {
      type: Number,
      require: true,
    },
    cell: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
    image: {
      url: String,
      public_id: String
    },
   
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("User", userSchema);
