const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const { models } = require("../models"); // Получаем объект моделей
const { User, Order } = models; // Извлекаем User и Order из models


// Получить данные пользователя
router.get("/orders", authMiddleware, async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: { userId: req.user.userId },
            include: [
                {
                   model: models.OrderItem,
        as: 'OrderItems', // Алиас должен совпадать с тем, что используется в модели Order
        include: [models.Product]
                }
            ],
            order: [["createdAt", "DESC"]]
        });

        res.json(orders);
    } catch (error) {
        console.error("Ошибка при получении заказов:", error.message);
        res.status(500).send("Ошибка при получении заказов");
    }
});


router.get('/', authMiddleware, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.userId);
        if (!user) {
            return res.status(404).send('Пользователь не найден');
        }
        res.json({ name: user.username, email: user.email });
    } catch (error) {
        res.status(500).send('Ошибка при получении данных пользователя');
    }
});


// Обновить данные пользователя
router.put("/", authMiddleware, async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = await User.findByPk(req.user.userId);  // Используем User
        if (!user) {
            return res.status(404).send("Пользователь не найден");
        }
        user.username = name || user.username;
        user.email = email || user.email;
        await user.save();
        res.json({ message: "Данные успешно обновлены" });
    } catch (error) {
        res.status(500).send("Ошибка при обновлении данных пользователя");
    }
});


module.exports = router;
