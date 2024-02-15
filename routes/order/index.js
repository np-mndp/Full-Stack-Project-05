const express = require("express");
const router = express.Router();
const Order = require("../../models/order");
const Menu = require("../../models/menu");
const Driver = require("../../models/driver");

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().populate("menu");
    const menu = await Menu.find().populate("driver");
    const driver = await Driver.find();
    return res.render("home", { orders, menu, driver });
  } catch (err) {
    console.error(err);
    return res.status(500).send("An error occurred while fetching orders.");
  }
});

router.post("/search", async (req, res) => {
  const orders = await Order.find({ custName: req.body.custName });
  return res.render("home", { orders });
});

router.post("/update_status", async (req, res) => {
  await Order.findByIdAndUpdate(req.body.order_id, {
    orderStatus: req.body.orderStatus,
  });
  return res.redirect("/manage");
});

router.get("/completed_orders", async (req, res) => {
  const orders = await Order.find({ orderStatus: "completed" });
  return res.render("completed_orders", { orders });
});

module.exports = router;
