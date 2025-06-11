const { bdd } = require('./connexion.js');
const { DataTypes } = require('sequelize');

const Posts = bdd.define('post', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  picture: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
});

module.exports = Posts;