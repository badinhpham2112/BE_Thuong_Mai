const express = require('express');
const router = express.Router()
const OrderController = require('../controllers/OrderController');
const { authMiddleware } = require('../middleware/authMiddleware');


router.post('/create', OrderController.createOrder);
router.get('/get-all-order/:id', OrderController.getAllOrder);

router.get('/get-details-order/:id', OrderController.getDetailsOrder);
router.delete('/cancel-order/:id', OrderController.CancelOrder);

router.get('/get-all-order-user', authMiddleware, OrderController.getAllOrderUser);


module.exports = router;