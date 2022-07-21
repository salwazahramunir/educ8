'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.hasMany(models.TransactionDetail);
    }
  }
  Transaction.init({
    invoice: DataTypes.STRING,
    totalPrice: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    // hooks: {
    //   beforeCreate(instance, option) {
    //     const date = new Date();
    //     console.log(date);
    //     instance.invoice = `INV-${date}`
    //   }
    // },
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};