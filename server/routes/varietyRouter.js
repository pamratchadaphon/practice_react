const varietyController = require('../controllers/varietyController')
const router = require('express').Router()

router.post('/addVariety', varietyController.addVariety)
router.get('/getAllVarietys', varietyController.getAllVariety)
router.get('/getVariety/:id', varietyController.getOneVariety)
router.put('/editVariety/:id', varietyController.editVariety)
router.delete('/deleteVariety/:id', varietyController.deleteVariety)

module.exports = router