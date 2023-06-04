const router = require('express').Router();
const {
    listBlog,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog
} = require('../controllers/blog.controller');



router.get("/list", listBlog)
router.get("/:id", getBlog)
router.post("/create", createBlog)
router.put("/update/:id", updateBlog)
router.delete("/delete/:id", deleteBlog)

module.exports = {
    BlogRoutes: router
}