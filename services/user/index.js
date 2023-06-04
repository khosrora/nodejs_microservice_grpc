require('./config/db.connection');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const protoPath = path.join(__dirname, "..", "..", "protos", "user.proto");
const userProto = protoLoader.loadSync(protoPath);
const { userPackage } = grpc.loadPackageDefinition(userProto);
const UserServiceUrl = 'localhost:6001';

const { CheckCodeOtp, GetPhoneNumber } = require('./functions/user.grpc');


function main() {
    const server = new grpc.Server();
    server.addService(userPackage.UserService.service, {
        CheckCodeOtp,
        GetPhoneNumber
    })
    server.bindAsync(UserServiceUrl, grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err) return console.log(err.message);
        console.log(`grpc product service running over port ` + port);
        server.start();
    })
}
main()