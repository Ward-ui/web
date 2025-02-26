module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  });

  // Ассоциации
  OrderItem.belongsTo(sequelize.models.Order, { foreignKey: 'orderId' });
  OrderItem.belongsTo(sequelize.models.Product, { foreignKey: 'productId' });

  return OrderItem;
};
