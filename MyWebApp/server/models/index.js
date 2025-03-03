const { Sequelize, DataTypes } = require('sequelize');

// Подключение к базе данных
const sequelize = new Sequelize('mysql://ISPr24-39_SevrukovKU:ISPr24-39_SevrukovKU@cfif31.ru:3306/ISPr24-39_SevrukovKU_Diplom',{
    logging: false
});
// Импорт моделей
const User = require('./user')(sequelize, DataTypes);
const Order = require('./order')(sequelize, DataTypes);
const Product = require('./product')(sequelize, DataTypes);
const Payment = require('./payment')(sequelize, DataTypes);
const Shipment = require('./shipment')(sequelize, DataTypes);
const Category = require('./category')(sequelize, DataTypes);
const Customer = require('./customer')(sequelize, DataTypes);
const Address = require('./address')(sequelize, DataTypes);
const Review = require('./review')(sequelize, DataTypes);
const Cart = require('./cart')(sequelize, DataTypes);
const OrderItem = require('./orderitem')(sequelize, DataTypes);
const Supplier = require('./supplier')(sequelize, DataTypes);
const Stock = require('./stock')(sequelize, DataTypes);
const Transaction = require('./transaction')(sequelize, DataTypes);
const Discount = require('./discount')(sequelize, DataTypes);

// Объединение моделей
const models = {
    User,
    Order,
    Product,
    Payment,
    Shipment,
    Category,
    Customer,
    Address,
    Review,
    Cart,
    OrderItem,
    Supplier,
    Stock,
    Transaction,
    Discount
};

// Связываем модели
Object.values(models).forEach(model => {
    if (model.associate) {
        model.associate(models);
    }
});


sequelize.authenticate()
    .then(() => {
        console.log('Подключение к базе данных успешно!');
    })
    .catch(error => {
        console.error('Ошибка при подключении к базе данных:', error);
    });

// Экспортируем sequelize и модели
module.exports = { User, sequelize, models };
