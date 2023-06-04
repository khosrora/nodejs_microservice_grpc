var jwt = require('jsonwebtoken');
const { UserModel } = require("../model/user.model");

async function GetPhoneNumber(call, callback) {
    try {
        const { phoneNumber } = call.request;
        await UserModel.create({
            phoneNumber,
            otpCode: Math.floor(1000 + Math.random() * 9000)
        })
        callback(null, { message: "کد اعتبار سنجی ارسال شد" })
    } catch (error) {
        callback(error, null)
    }
}

async function CheckCodeOtp(call, callback) {
    try {
        const { userCode, phoneNumber } = call.request;
        const user = await UserModel.findOne({ phoneNumber });
        if (user.otpCode === userCode) {
            const accessToken = await createAccessToken(user.id)
            user.otpCode = Math.floor(1000 + Math.random() * 9000);
            await user.save();
            return callback(null, { accessToken });
        }
        throw new Error("Invalid Code")
    } catch (error) {
        callback(error, null)
    }
}

async function createAccessToken(id) {
    return jwt.sign({ id }, 'shhhhh');
}

module.exports = {
    GetPhoneNumber,
    CheckCodeOtp
}