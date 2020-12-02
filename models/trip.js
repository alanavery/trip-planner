'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.trip.belongsTo(models.user);
      models.trip.hasMany(models.segment);
    }
  };
  trip.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 99],
          msg: 'Trip name must be between 1 and 99 characters.'
        }
      }
    },
    startDate: {
      type: DataTypes.DATEONLY,
      validate: { isDate: { msg: 'Invalid date.' } }
    },
    endDate: {
      type: DataTypes.DATEONLY,
      validate: { isDate: { msg: 'Invalid date.' } }
    },
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'trip'
  });
  return trip;
};