const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const blogProtoPath = path.join(__dirname, "..", "..", "protos", "blog.proto");
const blogProto = protoLoader.loadSync(blogProtoPath);
const { blogPackage } = grpc.loadPackageDefinition(blogProto);
const blogServiceUrl = 'localhost:5001';
const blogClient = new blogPackage.BlogService(blogServiceUrl, grpc.credentials.createInsecure());

function listBlog(req, res, next) {
    blogClient.getAllBlog(null, (err, data) => {
        if (err) return res.json(err.message);
        return res.status(200).json(data);
    })
}
function getBlog(req, res, next) {
    const { id } = req.params;
    blogClient.getOneBlog({ id }, (err, data) => {
        if (err) return res.json(err.message);
        return res.status(200).json(data)
    })
}
function createBlog(req, res, next) {
    blogClient.createBlog({ ...req.body }, (err, data) => {
        if (err) return res.json(err.message);
        return res.status(201).json(data);
    })
}
function updateBlog(req, res, next) {
    const { id } = req.params;
    let payload = { id, ...req.body };
    blogClient.updateBlog({ ...payload }, (err, data) => {
        if (err) return res.json(err.message);
        return res.status(200).json(data);
    });
}
function deleteBlog(req, res, next) {
    const { id } = req.params;
    blogClient.deleteBlog({ id }, (err, data) => {
        if (err) return res.json(err.message);
        return res.status(200).json(data);
    })
}


module.exports = {
    listBlog,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog
}