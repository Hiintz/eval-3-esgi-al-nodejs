const { DataTypes } = require('sequelize');
const { bdd } = require('./connexion.js');

const Emotion = bdd.define('Emotion', {
    type: {
        type: DataTypes.ENUM('like', 'love', 'thumbup'),
        allowNull: false
    }
});

module.exports = Emotion;