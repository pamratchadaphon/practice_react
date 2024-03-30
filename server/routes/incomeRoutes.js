const IncomeController = require('../controllers/incomeController')
const Router = require('express').Router()

Router.post('/addInCome', IncomeController.addIncome)
Router.get('/getAllIncome', IncomeController.getAllIncomes)
Router.get('/getOneIncome/:id', IncomeController.getOneIncomes)
Router.put('/editIncome/:id', IncomeController.editIncome)
Router.delete('/deleteIncome/:id', IncomeController.deleteIncome)

module.exports = Router