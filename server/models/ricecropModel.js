const { DataTypes } = require("sequelize")

module.exports = (sequelize,Sequelize) => {
    const RiceCrop = sequelize.define("RiceCrop", {
        year: DataTypes.INTEGER,
        startDate: DataTypes.DATE,
        endDate: DataTypes.DATE
    })

    return RiceCrop
}
