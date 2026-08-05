const crypto = require('crypto');
const express = require('express');
const Razorpay = require('razorpay');
const Order = require('../models/Order');
const auth = require('../middleware/auth');
const Cart = require('../models/Cart');

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post('/create-order', auth, async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Failed to create order',
    });
  }
});

router.post('/verify', auth, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const body =
      razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment Verification Failed",
      });
    }

    const cart = await Cart.findOne({ user: req.userId }).populate(
      "items.product"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    const items = cart.items.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      image: item.product.image,
      quantity: item.quantity,
      price: item.product.price,
    }));

    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      user: req.userId,
      items,
      totalAmount,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      status: "Paid",
    });

    cart.items = [];
    await cart.save();

    res.json({
      success: true,
      order,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
});

module.exports = router;