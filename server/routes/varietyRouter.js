const varietyController = require('../controllers/varietyController')
const router = require('express').Router()

router.post('/addVariety', varietyController.addVariety)
router.get('/getAllVarietys', varietyController.getAllVariety)
router.get('/getVariety/:varietyID', varietyController.getOneVariety)
router.put('/editVariety/:varietyID', varietyController.editVariety)
router.delete('/deleteVariety/:varietyID', varietyController.deleteVariety)

module.exports = router