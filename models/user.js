var mongoose = require("mongoose");
var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 10;

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    email:{type:String, unique:true, lowercase:true},
    password:String
    //goals:[{ type: Schema.Types.ObjectId, ref: 'Goals' }]
});
UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});



UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);

};
module.exports = mongoose.model("User",UserSchema);
