const Sequelize = require('sequelize');

const sequelize = new Sequelize('expenseTracker', 'root', '9300303708', {
    dialect: 'mysql',
    host : 'localhost'
})

module.exports = sequelize;