const db = require('../models')

const Variety = db.Variety

module.exports = {
    async addVariety (req,res) {
        const variety = await Variety.create(req.body)
        res.status(200).send(variety)
    },

    async getAllVariety (req,res) {
        const varietys = await Variety.findAll({})
        res.status(200).send(varietys)
    },

    async getOneVariety (req,res) {
        const variety = await Variety.findOne({ where: { id: req.params.id } })
        res.status(200).send(variety)
    },

    async editVariety (req,res) {
        await Variety.update(req.body,{ where: { id: req.params.id } })
        res.status(200).send(req.body)
    },

    async deleteVariety (req,res) {
        await Variety.destroy({ where: { id: req.params.id } })
        res.status(200).send('variety is deleted!')
    }
}

