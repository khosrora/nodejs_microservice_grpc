const { BlogModel } = require("../model/blog.model");



async function getAllBlog(call, callback) {
    try {
        const blogs = await BlogModel.find({});
        callback(null, { blogs })
    } catch (error) {
        callback(error, null)
    }
}

async function getOneBlog(call, callback) {
    try {
        const { id } = call.request;
        const blog = await BlogModel.findOne({ id });
        callback(null, { blog })
    } catch (error) {
        callback(error, null)
    }
}

async function createBlog(call, callback) {
    try {
        await BlogModel.create({ ...call.request });
        callback(null, { message: "بلاگ با موفقیت ایجاد شد" })
    } catch (error) {
        callback(error, null)
    }
}


async function updateBlog(call, callback) {
    try {
        const { id, title, text, shortText, author } = call.request;
        await BlogModel.findOneAndUpdate({ id }, {
            title, text, shortText, author
        });
        callback(null, { message: "بلاگ با موفقیت ویرایش شد" })
    } catch (error) {
        callback(error, null)
    }
}

async function deleteBlog(call, callback) {
    try {
        const { id } = call.request;
        await BlogModel.deleteOne({ id });
        callback(null, { message: "بلاگ حذف شد" })
    } catch (error) {
        callback(error, null)
    }
}

module.exports = {
    createBlog,
    getOneBlog,
    getAllBlog,
    deleteBlog,
    updateBlog
}