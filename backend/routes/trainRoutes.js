const express = require('express');
const { addTrain, updateTrain, getTrains, getAllTrains } = require('../controllers/trainController');

const router = express.Router();
router.post('/admin/add-train', addTrain);
router.put('/admin/update-train/:trainId', updateTrain);
router.get('/', getTrains);
router.get('/all', getAllTrains);

module.exports = router;
