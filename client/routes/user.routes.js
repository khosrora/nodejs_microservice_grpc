const router = require('express').Router();
const { CheckCodeOtp, GetPhoneNumber } = require('../controllers/user.controller');


router.post("/getCode", GetPhoneNumber)
router.post("/checkCode", CheckCodeOtp)

module.exports = {
    UserRoutes: router
}