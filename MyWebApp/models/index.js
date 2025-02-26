const { Sequelize, DataTypes } = require('sequelize');

// Настройка подключения к базе данных
const sequelize = new Sequelize('mysql://ISPr24-39_SevrukovKU:ISPr24-39_SevrukovKU@localhost:3306/ISPr24-39_SevrukovKU_Diplom');

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

// Настройка связей между моделями
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

Product.hasMany(OrderItem, { foreignKey: 'productId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

Order.hasOne(Payment, { foreignKey: 'orderId' });
Payment.belongsTo(Order, { foreignKey: 'orderId' });

Order.hasOne(Shipment, { foreignKey: 'orderId' });
Shipment.belongsTo(Order, { foreignKey: 'orderId' });

Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

Customer.hasMany(Order, { foreignKey: 'customerId' });
Order.belongsTo(Customer, { foreignKey: 'customerId' });

Customer.hasMany(Review, { foreignKey: 'customerId' });
Review.belongsTo(Customer, { foreignKey: 'customerId' });

Product.hasMany(Review, { foreignKey: 'productId' });
Review.belongsTo(Product, { foreignKey: 'productId' });

Customer.hasOne(Address, { foreignKey: 'customerId' });
Address.belongsTo(Customer, { foreignKey: 'customerId' });

Supplier.hasMany(Product, { foreignKey: 'supplierId' });
Product.belongsTo(Supplier, { foreignKey: 'supplierId' });

Product.hasMany(Stock, { foreignKey: 'productId' });
Stock.belongsTo(Product, { foreignKey: 'productId' });

Order.hasMany(Transaction, { foreignKey: 'orderId' });
Transaction.belongsTo(Order, { foreignKey: 'orderId' });

Order.hasOne(Discount, { foreignKey: 'orderId' });
Discount.belongsTo(Order, { foreignKey: 'orderId' });

// Экспортируем sequelize и модели
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

module.exports = { sequelize, models };
