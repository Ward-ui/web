module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active'
    }
  });

 Cart.associate = models => {
  Cart.belongsTo(models.User, { foreignKey: 'userId' });
  Cart.hasMany(models.OrderItem, { foreignKey: 'cartId' });
  }
  return Cart;
};
