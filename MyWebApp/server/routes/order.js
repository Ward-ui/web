const express = require('express');
const router = express.Router();
const { models } = require('../models'); 
const authMiddleware = require('../middleware/authmiddleware');
const { Order } = require("../models");
const { Op } = require("sequelize");
const { getIncomeForPeriod } = require("../service/salesService")

router.get("/sales", async (req, res) => {
  try {
    const { period } = req.query;

    if (!period) {
      return res.status(400).json({ message: "Параметр 'period' обязателен" });
    }

    const income = await getIncomeForPeriod(period);
    res.json({ totalIncome: income });
  } catch (error) {
    console.error("Ошибка на сервере:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.post('/sales', async (req, res) => {
  const { period } = req.body;
  try {
    const income = await getIncomeForPeriod(period);
    res.json(income);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении дохода' });
  }
});


// Получить все заказы
router.get('/', async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Создать новый заказ
router.post('/', authMiddleware ,async (req, res) => {
  try {
    const { orderDate, totalAmount, status, userId, customerId, discountId} = req.body;
    const order = await Order.create({ userId: req.user.id, orderDate, totalAmount, status, userId, customerId, discountId});
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
