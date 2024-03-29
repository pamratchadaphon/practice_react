const db = require('../models')

const Farmer = db.Farmer

const addFarmer = async (req,res) => {

    let info = {
        fname: req.body.fname,
        subdistrict: req.body.subdistrict,
        district:req.body.district,
        province:req.body.province,
        phone: req.body.phone
    }
    const farmer = await Farmer.create(info)
    res.status(200).send(farmer)
    console.log(farmer);
}

const getAllFarmer = async (req,res) => {

    let farmers = await Farmer.findAll({})
    res.status(200).send(farmers); 
}

const getOneFarmer = async (req,res) => {

    let id = req.params.id
    let farmer = await Farmer.findOne({where: { id: id }})
    res.status(200).send(farmer)
}

const updateFarmer = async (req,res) => {
    let id = req.params.id
    await Farmer.update(req.body, { where: { id: id }})
    res.status(200).send(req.body)
}

const deleteFarmer = async (req,res) => {
    let id = req.params.id
    await Farmer.destroy({where: { id: id }})
    res.status(200).send('farmer is deleted!')
}

//connect 1 to many
const getFarmerRicecrop = async (req,res) => {
    const data = await Farmer.findAll({
        include: [{ 
            model: db.RiceCrop,
            as: 'RiceCrop'
        }],
        where: { id: 1 }
    })
    res.status(200).send(data)
}

module.exports = {
    addFarmer,
    getAllFarmer,
    getOneFarmer,
    updateFarmer,
    deleteFarmer,
    getFarmerRicecrop
}