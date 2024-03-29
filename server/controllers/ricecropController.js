const db = require('../models')
const Ricecrop = db.RiceCrop

module.exports = {
    async addRicecrop (req,res) {
        const ricecrop = await Ricecrop.create(req.body)
        res.status(200).send(ricecrop)
    },
    async getAllRicecrop (req,res) {
        const ricecrops = await Ricecrop.findAll({})
        res.status(200).send(ricecrops)
    },
    async getOneRicecrop (req,res) {
        const ricecrop = await Ricecrop.findOne({ where: { id: req.params.id } })
        res.status(200).send(ricecrop)
    },
    async editRicecrop (req,res) {
        await Ricecrop.update(req.body, { where: { id: req.params.id } })
        res.status(200).send(req.body)
    },
    async deleteRicecrop (req,res) {
        await Ricecrop.destroy({ where: { id: req.params.id } })
        res.status(200).send('ricecrop is deleted!')
    }
}