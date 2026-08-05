const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

const router = express.Router();

const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) cart = await Cart.create({ user: userId, items: [] });
  return cart;
};

const populateCart = (cart) => cart.populate('items.product');

router.get('/', auth, async (req, res, next) => {
  try {
    const cart = await getOrCreateCart(req.userId);
    await populateCart(cart);
    res.json({ cart });
  } catch (err) {
    next(err);
  }
});

router.post('/items', auth, async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const cart = await getOrCreateCart(req.userId);
    const existing = cart.items.find((i) => i.product.toString() === productId);
    if (existing) {
      existing.quantity += Number(quantity);
    } else {
      cart.items.push({ product: productId, quantity: Number(quantity) });
    }
    await cart.save();
    await populateCart(cart);
    res.json({ cart });
  } catch (err) {
    next(err);
  }
});

router.put('/items/:productId', auth, async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const cart = await getOrCreateCart(req.userId);
    const item = cart.items.find((i) => i.product.toString() === req.params.productId);
    if (!item) return res.status(404).json({ message: 'Item not in cart' });
    if (quantity <= 0) {
      cart.items = cart.items.filter((i) => i.product.toString() !== req.params.productId);
    } else {
      item.quantity = Number(quantity);
    }
    await cart.save();
    await populateCart(cart);
    res.json({ cart });
  } catch (err) {
    next(err);
  }
});

router.delete('/items/:productId', auth, async (req, res, next) => {
  try {
    const cart = await getOrCreateCart(req.userId);
    cart.items = cart.items.filter((i) => i.product.toString() !== req.params.productId);
    await cart.save();
    await populateCart(cart);
    res.json({ cart });
  } catch (err) {
    next(err);
  }
});

router.delete('/', auth, async (req, res, next) => {
  try {
    const cart = await getOrCreateCart(req.userId);
    cart.items = [];
    await cart.save();
    res.json({ cart });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
