const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const secret = 'Login-2024'; // คีย์สำหรับสร้าง token JWT

const Farmer = db.Farmer;

// สร้าง token JWT สำหรับผู้ใช้ที่เข้าสู่ระบบ
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // ค้นหาผู้ใช้ด้วยอีเมล
        const farmer = await Farmer.findOne({ where: { email } });
        if (!farmer) {
            return res.status(404).json({ status: 'error', error: 'User not found' });
        }
        // ตรวจสอบรหัสผ่าน
        const match = await bcrypt.compare(password, farmer.password);
        if (!match) {
            return res.status(401).json({ status: 'error', error: 'Incorrect password' });
        }
        // สร้าง token JWT
        const token = jwt.sign({ id: farmer.id, email: farmer.email }, secret,{ expiresIn: '1h'});
        res.status(200).json({ status: 'ok', id: farmer.id, token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// เพิ่มเกษตรกรใหม่
const addFarmer = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const newFarmer = await Farmer.create({
        fname: req.body.fname,
        subdistrict: req.body.subdistrict,
        district: req.body.district,
        province: req.body.province,
        phone: req.body.phone,
        email: req.body.email,
        password: hashedPassword
    });
    res.status(201).json(newFarmer);
};
const authen = async (req,res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        var decoded = jwt.verify(token, secret);
        res.json({status:'ok',decoded})
    } catch (err) {
        res.json({status: 'error', messsge: err.massage})
    }
}

// ดึงข้อมูลเกษตรกรทั้งหมด
const getAllFarmer = async (req, res) => {
    let farmers = await Farmer.findAll({});
    res.status(200).send(farmers); 
};

// ดึงข้อมูลเกษตรกรจาก ID
const getOneFarmer = async (req, res) => {
    let id = req.params.id;
    let farmer = await Farmer.findOne({ where: { id } });
    res.status(200).send(farmer);
};

// อัปเดตข้อมูลเกษตรกร
const updateFarmer = async (req, res) => {
    let id = req.params.id;
    await Farmer.update(req.body, { where: { id } });
    res.status(200).send(req.body);
};

// ลบข้อมูลเกษตรกร
const deleteFarmer = async (req, res) => {
    let id = req.params.id;
    await Farmer.destroy({ where: { id } });
    res.status(200).send('Farmer is deleted!');
};

// เรียกข้อมูลเกษตรกรพร้อมข้อมูลของข้าว
const getFarmerRicecrop = async (req, res) => {
    const data = await Farmer.findAll({
        include: [{ 
            model: db.RiceCrop,
            as: 'RiceCrop'
        }],
        where: { id: 1 }
    });
    res.status(200).send(data);
};

module.exports = {
    login,
    addFarmer,
    getAllFarmer,
    getOneFarmer,
    updateFarmer,
    deleteFarmer,
    getFarmerRicecrop,
    authen
};
