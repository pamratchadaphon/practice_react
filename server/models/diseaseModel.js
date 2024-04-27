const { DataTypes } = require("sequelize");

module.exports = (sequelize,Sequelize) => {
    const Disease = sequelize.define("Disease", {
        name: DataTypes.STRING,
        prevention: DataTypes.STRING,
        symptom: DataTypes.STRING,
        img:DataTypes.STRING
    });

    return Disease;
}