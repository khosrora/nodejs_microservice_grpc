const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const ProtoPath = path.join(__dirname, "..", "..", "protos", "user.proto");
const proto = protoLoader.loadSync(ProtoPath);
const { userPackage } = grpc.loadPackageDefinition(proto);
const userServiceUrl = 'localhost:6001';
const UserClient = new userPackage.UserService(userServiceUrl, grpc.credentials.createInsecure());


function GetPhoneNumber(req, res, next) {
    const { phoneNumber } = req.body;
    UserClient.GetPhoneNumber({ phoneNumber }, (err, data) => {
        if (err) return res.json(err.message);
        return res.json(data)
    })
}

function CheckCodeOtp(req, res, next) {
    const { userCode, phoneNumber } = req.body;
    UserClient.CheckCodeOtp({ userCode, phoneNumber }, (err, data) => {
        if (err) return res.json(err.message);
        return res.json(data)
    })
}

module.exports = {
    GetPhoneNumber,
    CheckCodeOtp
}