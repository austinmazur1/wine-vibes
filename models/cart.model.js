const { Schema, model } = require("mongoose");
const User = require("./User.model");

const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        productName: {
          type: String,
          ref: "Product",
          required: true
        },
        productPrice : {
          type: Number,
          required: true,
          ref: "Product"
        }
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Cart = model("Cart", cartSchema);

module.exports = Cart;
