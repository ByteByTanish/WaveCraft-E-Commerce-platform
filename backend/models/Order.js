const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },

        name: String,

        image: String,

        quantity: Number,

        price: Number,
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    razorpayOrderId: {
      type: String,
      required: true,
    },

    razorpayPaymentId: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: 'Paid',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', orderSchema);