const {DataTypes} = require("sequelize")

module.exports = (sequelize,Sequelize) => {
    const IncomeExpense = sequelize.define('IncomeExpense', {
        detail: DataTypes.STRING,
        price: DataTypes.INTEGER,
        date:DataTypes.DATE,
        type: DataTypes.STRING
    })
    return IncomeExpense
}
