const { default: mongoose } = require("mongoose");




const userSchema = mongoose.Schema({
    id: { type: Number },
    fullName: { type: String },
    Address: { type: String },
    phoneNumber: { type: String },
    otpCode: { type: String }
});

userSchema.pre("save", function (next) {
    const self = this;
    self.constructor.count(async function (err, data) {
        if (err) return next(err);
        self.set({ id: (data + 1) })
        next();
    })
})

module.exports = {
    UserModel: mongoose.model("user", userSchema)
}