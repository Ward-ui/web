const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const { models } = require("../models");
const { User, Order, OrderItem, Product } = models;

// Проверка на администратора
const adminMiddleware = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Доступ запрещен" });
    }
    next();
};

// Получить все заказы
router.get("/", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [
                { 
                    model: User, 
                    attributes: ["username", "email"] 
                },
                 {
          model: OrderItem,
          as: 'OrderItems', // Убедитесь, что используете алиас 'OrderItems'
          include: [{ model: Product, attributes: ["name", "price"] }]
        }
            ]
        });
        res.json(orders);
    } catch (error) {
        console.error("Ошибка при получении всех заказов:", error);
        res.status(500).json({ message: "Ошибка при получении всех заказов" });
    }
});

// Изменить статус заказа
router.put('/:orderId', authMiddleware, async (req, res) => {
     try {
        const { orderId } = req.params;
        const { status } = req.body;

        // Проверка, что статус передан
        if (!status) {
            return res.status(400).json({ message: "Не указан статус заказа" });
        }

        // Получаем заказ вместе с его товарами
        const order = await Order.findOne({
            where: { id: orderId },
            include: [
                {
                    model: models.OrderItem,
                    as: 'OrderItems'
                }
            ]
        });

        if (!order) {
            return res.status(404).json({ message: "Заказ не найден" });
        }

        // Проверяем, был ли заказ уже отменен
        // Проверяем, что заказ уже не отменен
if (order.status.toLowerCase().replace("ё", "е") === "отменен") {
    console.log(`Статус заказа: ${order.status}`);
    return res.status(400).json({ message: "Этот заказ уже отменён" });
}


        console.log("Найден заказ:", order.id);

        // Если статус изменяется на "отменён", возвращаем количество на склад
        if (status.toLowerCase() === "отменён") {
            console.log("Меняем статус на 'отменён'. Возвращаем товары на склад...");
            for (const item of order.OrderItems) {
                const product = item.Product;
                if (product) {
                    console.log(`Возвращаем товар на склад: ${product.name}, Количество: ${item.quantity}`);
                    product.stockQuantity += item.quantity;
                    await product.save();
                    console.log(`Обновлено количество товара на складе: ${product.name} - ${product.stockQuantity}`);
                }
            }
        }

        // Обновляем статус заказа
        order.status = status.toLowerCase();
        await order.save();
        console.log("Статус заказа обновлён:", order.status);

        res.status(200).json({ message: "Статус заказа обновлён" });
    } catch (error) {
        console.error("Ошибка при изменении статуса заказа:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
});
module.exports = router;
