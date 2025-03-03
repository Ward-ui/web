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
    totalAmount: { // общая стоимость
      type: DataTypes.FLOAT,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Order.associate = models => {
  Order.belongsTo(models.Customer, { foreignKey: 'customerId' });
  Order.hasMany(models.OrderItem, { foreignKey: 'orderId' });
  }
  return Order;
};
