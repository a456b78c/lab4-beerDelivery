const express = require('express');
const Beer = require('../models/model');
const {
    priceList,
    makeOrder,
    previewOrder,
    editOrder,
    deleteOrder,
    Pay,
} = require('../controllers/controller');

const router = express.Router();

/* const {
    Registr,
    Login,
} = require('../controllers/conrollerAuth'); */

/* router.post('/register', Registr);
router.post('/login', Login); */

router.get('/pricelist', priceList);
router.post('/makeorder', makeOrder);
router.get('/previeworder/:id', previewOrder);
router.patch('/editorder/:id', editOrder);
router.delete('/deleteorder/:id', deleteOrder);
router.post('/pay', Pay);

module.exports = router;

