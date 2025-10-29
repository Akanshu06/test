// ·     Service ID
// ·     Duration
// ·     Price
// ·     Type  (Note - Possible Options are Hourly, Weekly, Monthl)

const sequelize = require('sequelize');
const db = require('../config/mysql');  

const ServicePriceOption = db.define('ServicePriceOption', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,    
        autoIncrement: true
    },
    duration: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    price: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    type: {
        type: sequelize.STRING,
        allowNull: false
    }
})

module.exports = ServicePriceOption;
