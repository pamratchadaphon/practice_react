const diseaseController = require('../controllers/diseaseController');
const router = require('express').Router();

router.post('/addDisease', diseaseController.addDisease);
router.get('/getAlldisease', diseaseController.getAllDisease);
router.get('/getOneDisease/:diseaseID', diseaseController.getOneDisease);
router.put('/editDisease/:diseaseID', diseaseController.editDisease);
router.delete('/deleteDisease/:diseaseID', diseaseController.deleteDisease);

module.exports = router