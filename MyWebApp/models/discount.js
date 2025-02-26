module.exports = (sequelize, DataTypes) => {
  const Discount = sequelize.define('Discount', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    percentage: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });

  // Ассоциации
  Discount.hasMany(sequelize.models.Order, { foreignKey: 'discountId' });

  return Discount;
};
