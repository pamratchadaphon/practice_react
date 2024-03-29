module.exports = (sequelize,DataTypes) => {
    const Income = sequelize.define('Incomes', {
        IncomeID : {
            type: DataTypes.STRING,
            primaryKey: true,
            autoIncrement: true
        },
        CropID : {
            type: DataTypes.INTEGER,
            references: {
                model: 'CropModel', 
                key: 'id', 
            },
        }
    })
}