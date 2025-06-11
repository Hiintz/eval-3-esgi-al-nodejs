const { DataTypes } = require('sequelize');
const { bdd } = require('./connexion.js');

const Emotion = bdd.define('Emotion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: DataTypes.ENUM('like', 'love', 'thumbup'),
        allowNull: false
    }
});

module.exports = Emotion;