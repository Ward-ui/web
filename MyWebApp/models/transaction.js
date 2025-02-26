module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    transactionDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    transactionType: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  // Ассоциации
  Transaction.belongsTo(sequelize.models.Order, { foreignKey: 'orderId' });
  Transaction.belongsTo(sequelize.models.User, { foreignKey: 'userId' });

  return Transaction;
};
