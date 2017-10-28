// app/models/user.js
// load the things we need
//var mongoose = require('mongoose');
//var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = {

    local            : {
        email        : String,
        password     : String,
    }};
// ,
//     facebook         : {
//         id           : String,
//         token        : String,
//         email        : String,
//         name         : String
//     },
//     twitter          : {
//         id           : String,
//         token        : String,
//         displayName  : String,
//         username     : String
//     },
//     google           : {
//         id           : String,
//         token        : String,
//         email        : String,
//         name         : String
//     }

// });

// methods ======================
// generating a hash
userSchema.generateHash = function(password) {
    //return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    return password;
};

// checking if password is valid
userSchema.validPassword = function(password) {
    //return bcrypt.compareSync(password, this.local.password);
    return password;
};

// create the model for users and expose it to our app
//module.exports = mongoose.model('User', userSchema);
module.exports = userSchema;