const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('../db/connection');

class User extends Model {
  // Instance method to check if form submitted password matches the saved user's
  // encrypted password
  async validatePass(provided_password) {
    // bcrypt compare returns a boolean, based on if the string matches the encrypted string
    const is_valid = await bcrypt.compare(provided_password, this.password);

    return is_valid;
  }
}

User.init({
  email: {
    type: DataTypes.STRING,
    // Ensure that the email address can only be used once in the table
    unique: {
      arg: true,
      msg: 'That email address is already in use.'
    },
    validate: {
      // Check that the value is a valid email address
      isEmail: {
        args: true,
        msg: 'You must enter a valid email address.'
      }
    },
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    validate: {
      // Check that the value is at least 6 characters in length
      len: {
        args: 6,
        msg: 'Your password must be at least 6 characters in length.'
      }
    },
    allowNull: false
  }
}, {
  sequelize: db,
  modelName: 'user',
  hooks: {
    // Do something right before the user is stored to the table
    async beforeCreate(user) {
      // bcrypt hash will return an ecrypted string mixing the standard password string 
      // with 10 levels of salt in this case
      const encrypted_pass = await bcrypt.hash(user.password, 10);

      // Store the encrypted password to the database instead of the standard string
      user.password = encrypted_pass;
    }
  }
});

module.exports = User;