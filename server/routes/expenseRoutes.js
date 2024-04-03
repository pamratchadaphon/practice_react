const expenseController = require('../controllers/expensesController')
const router = require('express').Router()

router.post('/addExpense', expenseController.addExpense)
router.get('/getAllExpenses', expenseController.getAllExpenses)
router.get('/getOneExpense/:id', expenseController.getOneExpense)
router.put('/editExpense/:id', expenseController.editExpense)
router.delete('/deleteExpense/:id', expenseController.deleteExpense)

module.exports = router