// Category ID
// ·     Service Name
// ·     Type  (Note - Possible Options are Normal, VIP)
// ·     Price Options (Note - Service can have multiple price option)

const sequelize = require('sequelize');
const db = require('../config/mysql');

const Service = db.define('Service', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize.STRING,
        allowNull: false
    },
    type: {
        type: sequelize.STRING,
        allowNull: false
    }
});