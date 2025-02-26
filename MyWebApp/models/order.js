module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  // Ассоциации
  Order.belongsTo(sequelize.models.Customer, { foreignKey: 'customerId' });
  Order.hasMany(sequelize.models.OrderItem, { foreignKey: 'orderId' });

  return Order;
};
