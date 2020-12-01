'use strict';

// Import modules
let bcrypt = require('bcrypt');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.hasMany(models.trip);
    }
  };
  user.init({
    // Validate user's first and last name, email and password
    firstName: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 99],
          msg: 'First name must be between 1 and 99 characters.'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 99],
          msg: 'Last name must be between 1 and 99 characters.'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: { isEmail: { msg: 'Invalid email address.' } }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8, 99],
          msg: 'Password must be between 8 and 99 characters.'
        }
      }
    }
  }, {
    // Hash user's password before saving it to database
    hooks: {
      beforeCreate: pendingUser => {
        if (pendingUser && pendingUser.password) {
          let hash = bcrypt.hashSync(pendingUser.password, 12);
          pendingUser.password = hash;
        }
      }
    },
    sequelize,
    modelName: 'user'
  });
  // Create method to validate passwords
  user.prototype.validPassword = function (submittedPassword) {
    let correctPassword = bcrypt.compareSync(submittedPassword, this.password);
    // console.log(`Password is valid: ${correctPassword}`);
    return correctPassword;
  };
  // Create method to protect password data
  user.prototype.toJSON = function () {
    // console.log('Inside of toJSON.');
    let userData = this.get();
    delete userData.password;
    // console.log(userData);
    return userData;
  };
  return user;
};