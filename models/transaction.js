'use strict';
const {
  Model
} = require('sequelize');

const { formatDate } = require('../Helper/formatter');

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

    convertDate() {
      return formatDate(new Date);
    }
  }
  Transaction.init({
    invoice: DataTypes.STRING,
    totalPrice: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(instance, option) {
        const today = new Date()
        const years =  today.getFullYear();
        const month =  today.getMonth() + 1;
        const date =  today.getDate();
        const second = today.getSeconds();
        const angkaRandom = Math.floor(Math.random() * 10);
        instance.invoice = `EDC-${second}${years}${month}${date}${angkaRandom}`
      }
    },
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};