const express = require('express');
const app = express();
const sequelize = require('./models/index'); // Подключение к базе данных

// Подключение роутеров для всех моделей
const userRoutes = require('./routes/user');
const orderRoutes = require('./routes/order');
const productRoutes = require('./routes/product');
const paymentRoutes = require('./routes/payment');
const shipmentRoutes = require('./routes/shipment');
const categoryRoutes = require('./routes/category');
const customerRoutes = require('./routes/customer');
const addressRoutes = require('./routes/address');
const reviewRoutes = require('./routes/review');
const cartRoutes = require('./routes/cart');
const orderItemRoutes = require('./routes/orderItem');
const supplierRoutes = require('./routes/supplier');
const stockRoutes = require('./routes/stock');
const transactionRoutes = require('./routes/transaction');
const discountRoutes = require('./routes/discount');

// Настройка middleware
app.use(express.json()); // Для обработки JSON данных

// Подключение маршрутов для каждого типа данных
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/shipments', shipmentRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/order-items', orderItemRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/discounts', discountRoutes);

// Инициализация базы данных и запуск сервера
sequelize.sync()
  .then(() => {
    console.log('Database synced');
    // Запуск сервера после синхронизации таблиц
    app.listen(3000, () => {
      console.log('Server is running on http://localhost:3000');
    });
  })
  .catch(err => console.log(err));
