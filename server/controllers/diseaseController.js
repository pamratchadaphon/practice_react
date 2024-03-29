const db = require('../models');
const Disease = db.Disease;

module.exports = {
    async addDisease (req,res) {
        const disease =  await Disease.create(req.body);
        res.status(200).send(disease)
    },

    async getAllDisease (req,res) {
        const diseases = await Disease.findAll({})
        res.status(200).send(diseases)
    },

    async getOneDisease (req,res) {
        const disease = await Disease.findOne({ where: { diseaseID: req.params.diseaseID } })
        res.status(200).send(disease)
    },

    async editDisease (req,res) {
        await Disease.update(req.body, { where: { diseaseID: req.params.diseaseID } })
        res.status(200).send(req.body)
    },

    async deleteDisease (req,res) {
        await Disease.destroy({ where: { diseaseID : req.params.diseaseID } })
        res.status(200).send("disease is deleted!")
    }
}


