module.exports = (sequelize, DataTypes) => {
  const Supplier = sequelize.define('Supplier', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contactInfo: {
      type: DataTypes.STRING
    }
  });

  // Ассоциации
  Supplier.hasMany(sequelize.models.Product, { foreignKey: 'supplierId' });

  return Supplier;
};
