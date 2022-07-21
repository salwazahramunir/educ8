'use strict';
const {
  Model
} = require('sequelize');

const { formatDate } = require('../Helper/formatter');

module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User);
    }

    convertDate() {
      return formatDate(this.dateOfBirth);
    }
  }
  Profile.init({
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    age: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate(instance, option) {
        const years = new Date().getFullYear();
        instance.age = years - instance.dateOfBirth.getFullYear();
      }
    },
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};