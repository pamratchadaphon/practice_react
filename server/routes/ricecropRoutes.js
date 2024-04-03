const ricecropController = require('../controllers/ricecropController')
const router = require('express').Router()

router.post('/addRicecrop', ricecropController.addRicecrop)
router.get('/getAllRicecrop', ricecropController.getAllRicecrop)
router.get('/getOneRicecrop/:id', ricecropController.getOneRicecrop)
router.put('/editRicecrop/:id', ricecropController.editRicecrop)
router.delete('/deleteRicecrop/:id', ricecropController.deleteRicecrop)
router.get('/getRicecropIncomeExpense/:ricecropID', ricecropController.getRicecropIncomeExpense)

module.exports = router