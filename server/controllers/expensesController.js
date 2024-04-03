const db = require('../models')
const Expenses = db.Expanses

module.exports = {
    async addExpense(req,res){
        const expenses = await Expenses.create(req.body)
        res.status(200).send(expenses)
    },
    async getAllExpenses (req,res){
        const expenses = await Expenses.findAll({})
        res.status(200).json(expenses)
    },
    async getOneExpense (req,res){
        const id = req.params.id
        const expense = await Expenses.findOne({where: {id: id}})
        res.status(200).json(expense)
    },
    async editExpense (req,res){
        const id = req.params.id
        await Expenses.update(req.body, {where: {id: id}})
        res.status(200).json(req.body)
    },
    async deleteExpense (req,res){
        const id = req.params.id
        await Expenses.destroy({where: {id: id}})
        res.status(200).send('expenses is deleted!')
    }
}