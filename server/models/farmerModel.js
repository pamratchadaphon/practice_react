const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Farmer = sequelize.define("Farmer", {
        fname: DataTypes.STRING,
        subdistrict: DataTypes.STRING,
        phone: DataTypes.STRING,
    });

    return Farmer;
};
