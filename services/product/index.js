require('./config/db.connection');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const protoPath = path.join(__dirname, "..", "..", "protos", "product.proto");
const productProto = protoLoader.loadSync(protoPath);
const { productPackage } = grpc.loadPackageDefinition(productProto);
const ProductServiceUrl = 'localhost:4001';



const { listProduct, getProduct, createProduct, updateProduct, deleteProduct } = require('./functions/product.grpc');

function main() {
    const server = new grpc.Server();
    server.addService(productPackage.ProductService.service, {
        listProduct,
        getProduct,
        createProduct,
        updateProduct,
        deleteProduct
    });
    server.bindAsync(ProductServiceUrl, grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err) return console.log(err.message);
        console.log(`grpc product service running over port ` + port);
        server.start()
    })
}
main();