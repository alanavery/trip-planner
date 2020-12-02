'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class segment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.segment.belongsTo(models.trip);
      models.segment.belongsTo(models.subcategory);
    }
  };
  segment.init({
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: { isDate: { msg: 'Invalid date.' } }
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: { isDate: { msg: 'Invalid date.' } }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 99],
          msg: 'Name must be between 1 and 99 characters.'
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [1, 99],
          msg: 'Address must be between 1 and 99 characters.'
        }
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [1, 99],
          msg: 'Phone must be between 1 and 99 characters.'
        }
      }
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { isUrl: { msg: 'Invalid url.' } }
    },
    notes: {
      type: DataTypes.STRING(500),
      allowNull: true,
      validate: {
        len: {
          args: [1, 500],
          msg: 'Notes must be between 1 and 500 characters.'
        }
      }
    },
    booked: DataTypes.BOOLEAN,
    tripId: DataTypes.INTEGER,
    subcategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'segment',
  });
  return segment;
};