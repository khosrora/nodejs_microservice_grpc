const router = require('express').Router();

const { BlogRoutes } = require('./blog.routes');
const { ProductRouter } = require('./product.routes');
const { UserRoutes } = require('./user.routes');




router.use("/product", ProductRouter)
router.use("/blog", BlogRoutes)
router.use("/user", UserRoutes)

module.exports = {
    AllRoutes: router
}