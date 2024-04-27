const diseaseController = require('../controllers/diseaseController');
const router = require('express').Router();

router.post('/addDisease', diseaseController.addDisease);
router.get('/getAlldisease', diseaseController.getAllDisease);
router.get('/getOneDisease/:id', diseaseController.getOneDisease);
router.put('/editDisease/:id', diseaseController.editDisease);
router.delete('/deleteDisease/:id', diseaseController.deleteDisease);

module.exports = router