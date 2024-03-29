const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Variety = sequelize.define("Varietys", {
        varietyID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        description: DataTypes.STRING
    });

    return Variety;
};