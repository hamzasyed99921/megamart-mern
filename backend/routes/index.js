const express = require('express');
const authController = require('../controllers/authController');
const productController = require('../controllers/productControler');
const contactController = require('../controllers/contactController');
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');

const router = express.Router()

router.get('/',(req,res) => {
    res.json({message: 'this is get request'})
})

// user

// register
router.post('/register', authController.register);
// login
router.post('/login', authController.login);
// logout   
router.post('/logout', auth , authController.logout);

// refresh token

router.get('/refresh', authController.refresh)


// product
router.post('/product', productController.create)
router.get('/product/all', productController.getAllProducts)
router.get('/product/:id', productController.getProductById)
router.put('/product/:id', productController.updateProduct)
router.delete('/product/:id', productController.deleteProduct)

// contact (create only)
router.post('/contact', contactController.create)

// place order
router.post('/order', orderController.create)
router.get('/order/all', orderController.getAllOrder)
router.get('/order/:id', orderController.getOrderById)
router.put('/order/:id/approve', orderController.approveOrder)

module.exports = router