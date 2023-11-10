import { Schema, model } from "mongoose";

const bookSchema = new Schema(
  {
    id: {
      type: String,
      require: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      require: true,
    },
    urlImage: {
      type: String,
      require: true,
    },
    isbn: {
      type: String,
      require: true,
    },
    author: {
      type: String,
      require: true,
    },
    quality: {
      type: Number,
      require: true,
    },
    selleruser: {
      type: String,
      require: true,
    },
    quantity: {
      type: Number,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    observations: {
      type: String,
      require: true,
    },
    onSale: {
        type: String,
        require: true,
      },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Book", bookSchema);
