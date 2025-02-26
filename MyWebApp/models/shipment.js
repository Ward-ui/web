module.exports = (sequelize, DataTypes) => {
  const Shipment = sequelize.define('Shipment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    shipmentDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    trackingNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  // Ассоциации
  Shipment.belongsTo(sequelize.models.Order, { foreignKey: 'orderId' });

  return Shipment;
};
