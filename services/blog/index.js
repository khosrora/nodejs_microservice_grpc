require('./config/db.connection');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const protoPath = path.join(__dirname, "..", "..", "protos", "blog.proto");
const blogProto = protoLoader.loadSync(protoPath);
const { blogPackage } = grpc.loadPackageDefinition(blogProto);
const blogServiceUrl = 'localhost:5001';

const {
    createBlog,
    getOneBlog,
    getAllBlog,
    deleteBlog,
    updateBlog
} = require('./functions/blog.grpc');

function main() {
    const server = new grpc.Server();
    server.addService(blogPackage.BlogService.service, {
        createBlog,
        getOneBlog,
        getAllBlog,
        deleteBlog,
        updateBlog
    })
    server.bindAsync(blogServiceUrl , grpc.ServerCredentials.createInsecure() , (err , port) => {
        if(err) return console.log(err.message);
        console.log(`grpc blog service runnig over port` + port);
        server.start();
    })
}
main();