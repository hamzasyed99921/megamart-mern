const mongoose = require('mongoose');

const {Schema} = mongoose;

const userSchema = new Schema ({
    username: {type: String, required: true},
    email: {type: String, required: true},
    contact: {type: String, required: true},
    password: {type: String, required: true},
    role: {
        type: String,
        enum: ["user", "admin"], 
        default: "user"
      }
},
    {timestamps: true}
)

module.exports = mongoose.model('User', userSchema, 'users')