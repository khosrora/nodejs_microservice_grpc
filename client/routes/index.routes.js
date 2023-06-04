const router = require('express').Router();
const { BlogRoutes } = require('./blog.routes');
const { ProductRouter } = require('./product.routes');




router.use("/product", ProductRouter)
router.use("/blog", BlogRoutes)

module.exports = {
    AllRoutes: router
}