module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {  // Описание
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    stockQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Product.associate = models => {
  Product.belongsTo(models.Category, { foreignKey: 'categoryId' });
  Product.hasMany(models.OrderItem, { foreignKey: 'productId' });
  }
  return Product;
};
