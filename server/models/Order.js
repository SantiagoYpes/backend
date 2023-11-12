import { Schema, model } from "mongoose";

// If I want that the title be a primary key
const orderSchema = new Schema(
  {
    id:{
      type: String,
      required: true,
      unique:true
    },
    countproducts: {
      type: String,
      require: true,
      trim: true
    },
    seller: {
      type: String,
      require: true,
      trim: true
    },
    buyer: {
      type: String,
      require: true,
      trim: true
    },
    state: {
      type: String,
      require: true
    },
    totalprice: {
      type: String,
      require: true
    },
    locateFrom: {
      type: String,
      require: true
    },
    locateTo: {
      type: String,
      require: true
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Order", orderSchema);
