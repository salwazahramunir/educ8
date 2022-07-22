'use strict';
const {
  Model
} = require('sequelize');

const { formatRupiah } = require('../Helper/formatter');

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.hasMany(models.TransactionDetail);
    }

    get convertRupiah() {
      return formatRupiah(this.price);
    }
  }
  Course.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'name of a new course is required'
        },
        notNull: {
          msg: 'name of a new course is required'
        },
        isMoreThanTwoWords(value){
          if(value.split(' ').length < 2){
            throw new Error('name of a new course at least two words')
          }
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate : {
        notEmpty: {
          msg: 'description of a new course is required'
        },
        notNull: {
          msg: 'description of a new course is required'
        },
        isMoreThanFiveWords(value){
          if(value.split(' ').length < 5){
            throw new Error('description of a new course at least five words')
          }
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'price of a new course is required'
        },
        notNull: {
          msg: 'price of a new course is required'
        },
        min: {
          args: [50000],
          msg: 'price of new course at least Rp 50.000'
        }
      }
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate : {
        notEmpty : {
          msg: 'duration of a new course is required'
        },
        notNull : {
          msg: 'duration of a new course is required'
        },
        min: {
          args: [60],
          msg: 'duration of new course at least 60 minutes'
        }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty : {
          msg: 'imageUrl of a new course is required'
        },
        notNull : {
          msg: 'imageUrl of a new course is required'
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty : {
          msg: 'category of a new course is required'
        },
        notNull : {
          msg: 'category of a new course is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};
