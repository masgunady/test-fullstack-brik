const productRouter = require('express').Router()
const productController = require('../controllers/product.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const uploadMiddleware = require('../middlewares/upload.middleware')

productRouter.get('/', productController.getAll)
productRouter.get('/:id', productController.getOne)
productRouter.post('/', authMiddleware, uploadMiddleware('image'), productController.createProduct)

module.exports = productRouter