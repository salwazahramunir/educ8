'use strict';
const {
  Model, where
} = require('sequelize');
const { Sequelize } = require('.');
module.exports = (sequelize, DataTypes) => {
  class TransactionDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TransactionDetail.belongsTo(models.Transaction);
      TransactionDetail.belongsTo(models.User);
      TransactionDetail.belongsTo(models.Course);
    }

    static info(userId) {
      return TransactionDetail.findAll({
        where: {
          UserId: userId
        },
        include: [{ 
          model: sequelize.models.Transaction,
          where: {
            status: "paid"
          }
        }]
      });
    }
  }
  TransactionDetail.init({
    UserId: DataTypes.INTEGER,
    CourseId: DataTypes.INTEGER,
    TransactionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TransactionDetail',
  });
  return TransactionDetail;
};