const { DataTypes } = require("sequelize");

module.exports = (sequelize,Sequelize) => {
    const Disease = sequelize.define("Disease", {
        diseaseID : {
            type: DataTypes.STRING,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        prevention: DataTypes.STRING,
        treatment: DataTypes.STRING
    });

    return Disease;
}