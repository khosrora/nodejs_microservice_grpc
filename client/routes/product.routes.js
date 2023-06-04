const router = require('express').Router();
const { listProduct, createProduct, updateProduct, deleteProduct, getProduct } = require('../controllers/product.controller');


router.get("/list", listProduct)
router.get("/create", createProduct)
router.get("/update", updateProduct)
router.get("/delete/:id", deleteProduct)
router.get("/:id", getProduct)

module.exports = {
    ProductRouter: router
}