const db = require('../models')
const Income = db.Income

module.exports = {
    async addIncome(req,res){
       const income = await Income.create(req.body)
       res.status(200).send(income)
    },
    async getAllIncomes(req,res){
        const incomes = await Income.findAll({})
        res.status(200).send(incomes)
    },
    async getOneIncomes(req,res){
        const income = await Income.findOne({ where: {id: req.params.id}})
        res.status(200).send(income)
    },
    async editIncome(req,res){
        await Income.update(req.body,{where:{id: req.params.id}})
        res.status(200).send(req.body)
    },
    async deleteIncome(req,res){
        const income = await Income.destroy({where:{id:req.params.id}})
        res.status(200).send('income is deleted!')
    }
}