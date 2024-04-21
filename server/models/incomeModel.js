const { DataTypes } = require("sequelize")

module.exports = (sequelize,Sequelize) => {
    const Income = sequelize.define('Incomes', {
        incomeDetails: DataTypes.STRING,
        amount: DataTypes.INTEGER,
        incomeDate: DataTypes.DATE
    })
    return Income
}