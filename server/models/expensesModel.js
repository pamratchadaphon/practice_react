const { DataTypes } = require("sequelize");

module.exports = (sequelize,Sequelize) => {
    const Expanses = sequelize.define("Expenses", {
        date: DataTypes.DATE,
        amount: DataTypes.INTEGER,
        detail: DataTypes.STRING
    })
    return Expanses
}