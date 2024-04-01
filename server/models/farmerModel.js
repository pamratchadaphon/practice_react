const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Farmer = sequelize.define("Farmer", {
        fname: DataTypes.STRING,
        subdistrict: DataTypes.STRING,
        district:DataTypes.STRING,
        province:DataTypes.STRING,
        phone: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING
    });

    return Farmer;
};
