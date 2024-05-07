const db = require('../models')
const IncomeExpense = db.IncomeExpense

module.exports = {
    async addIncomeExpense (req, res) {
        const incomeExpense = await IncomeExpense.create(req.body)
        res.status(200).json(incomeExpense)
    },
    async getAllIncomExpense (req,res) {
        const incomeExpense = await IncomeExpense.findAll({})
        res.status(200).json(incomeExpense)
    },
    async getOneIncomeExpense (req,res) {
        const incomeExpense = await IncomeExpense.findOne({ where:{id:req.params.id}})
        res.status(200).json(incomeExpense)
    },
    async editIncomeExpense (req,res) {
        await IncomeExpense.update(req.body,{where:{id:req.params.id}})
        res.status(200).json(req.body)
    },
    async deleteIncomeExpense (req,res) {
        await IncomeExpense.destroy({where:{id:req.params.id}})
        res.status(200).send("income and expense is deleteed!")
    }
}