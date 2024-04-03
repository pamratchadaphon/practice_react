const dbConfig = require('../config/dbConfig')
const {Sequelize,Datetype} = require('sequelize')
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host:dbConfig.HOST,
        dialect: dbConfig.dialect,
        pool: {
            max : dbConfig.pool.max,
            min : dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
)

sequelize.authenticate()
.then(() => {
    console.log('connected!');
})
.catch(err => {
    console.log('Error'+err);
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize
db.Farmer = require('./farmerModel')(sequelize,Datetype)
db.Variety = require('./varietyModel')(sequelize,Datetype)
db.Disease = require('./diseaseModel')(sequelize,Datetype)
db.RiceCrop = require('./ricecropModel')(sequelize,Datetype)
db.Income = require('./incomeModel')(sequelize,Datetype)
db.Expanses = require('./expensesModel')(sequelize,Datetype)

db.sequelize.sync({force:false})
.then(() => {
    console.log('yes re-sync done!');
})

//1 to many ชาวนา1 รอบการปลูกM
db.Farmer.hasMany(db.RiceCrop, {
    foreignKey: 'farmerID',
    as: 'RiceCrop'
})
db.RiceCrop.belongsTo(db.Farmer, {
    foreignKey: 'farmerID',
    as: 'Farmer'
})

//1 to many ชาวนา1 รายรับM
db.Farmer.hasMany(db.Income, {
    foreignKey: 'farmerID',
    as: 'Income'
})
db.Income.belongsTo(db.Farmer, {
    foreignKey: 'farmerID',
    as: 'Farmer'
})

//1 to many รอบการปลูก1 รายรับM
db.RiceCrop.hasMany(db.Income, {
    foreignKey: 'ricecropID',
    as: 'Income'
})
db.Income.belongsTo(db.RiceCrop, {
    foreignKey: 'ricecropID',
    as: 'RiceCrop'
})

//1 to many รอบการปลูก1 รายรับM
db.RiceCrop.hasMany(db.Expanses, {
    foreignKey: 'ricecropID',
    as: 'Expense'
})
db.Expanses.belongsTo(db.RiceCrop, {
    foreignKey: 'ricecropID',
    as: 'RiceCrop'
})

//1 to many ชาวนา1 รายรับM
db.Farmer.hasMany(db.Expanses, {
    foreignKey: 'farmerID',
    as: 'Expanse'
})
db.Expanses.belongsTo(db.Farmer, {
    foreignKey: 'farmerID',
    as: 'Farmer'
})

module.exports = db