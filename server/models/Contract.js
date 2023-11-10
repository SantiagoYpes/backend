import { Schema, model } from "mongoose";

// If I want that the title be a primary key
const userSchema = new Schema(
  {
    ced: {
      type: String,
      require: true,
      trim: true
    },
    url: {
      type: String,
      require: true
    },
    public_id: {
      type: String,
      require: true
    },
    signed:{
      type:String,
      require:true
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Contract", userSchema);
