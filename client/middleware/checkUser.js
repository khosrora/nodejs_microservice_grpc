module.exports = function checkUser(req, res, next) {
    const token = req.header("authorization");
    console.log(token);
    next();
}