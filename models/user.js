// It is the schema for the user. It contains two array one will tell the person which user have to review and 
// the second one will contain the list of review, which the person had recieved.

const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: 'String',
        requried: true
    },
    email: {
        type:'String',
        required: true,
        unique: true
    },
    password: {
        type: 'String',
        required: true
    },
    isAdmin: {
        type: Boolean,
        requried: true
    },
    userToReview: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    // Recieved review from another people
    reviewRecievedFrom : [
        {
            type: mongoose.Schema.ObjectId,
            ref: true
        }
    ]
},
{
    timestamps: true
}
);

const User  = mongoose.model('User',UserSchema);
module.exports = User;