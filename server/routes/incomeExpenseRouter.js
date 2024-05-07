const IncomeExpenseController = require('../controllers/incomeExpenseController')
const Router = require('express').Router()

Router.post('/addIncomeExpense', IncomeExpenseController.addIncomeExpense)
Router.get('/getAllIncomeExpense', IncomeExpenseController.getAllIncomExpense)
Router.get('/getOneIncomeExpense/:id', IncomeExpenseController.getOneIncomeExpense)
Router.put('/editIncomeExpense/:id', IncomeExpenseController.editIncomeExpense)
Router.delete('/deleteIncomeExpense/:id', IncomeExpenseController.deleteIncomeExpense)

module.exports = Router