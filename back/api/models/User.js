const S = require("sequelize");
const db = require("../db");
const bcrypt = require("bcrypt");

class User extends S.Model {
  validatePassword(password) {
    return bcrypt
      .hash(password, this.salt)
      .then((hash) => hash === this.password);
  }
}

User.init(
  {
    email: {
      type: S.STRING,
      allowNull: false,
    },
    name: {
      type: S.STRING,
      allowNull: false,
    },
    lastname: {
      type: S.STRING,
      allowNull: false,
    },
    dni: {
      type: S.INTEGER,
      allowNull: false,
    },
    password: {
      type: S.STRING,
      allowNull: false,
    },

    salt: {
      type: S.STRING,
    },
  },
  { sequelize: db, modelName: "user" }
);

User.addHook("beforeCreate", (user) => {
  const salt = bcrypt.genSaltSync();
  user.salt = salt;

  return bcrypt.hash(user.password, user.salt).then((hash) => {
    user.password = hash;
  });
});
module.exports = User;
