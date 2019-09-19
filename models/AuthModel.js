const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('User', userSchema);

exports.createNewUser = (username, email, password) => {
    // check if user exists by email, if exist? error, can't signup, if not exist, then create new user
    return new Promise((resolve, reject) => {
        return User.findOne({email}).then(user => {
            // if exist by email
            if(user) {
                reject('Email was used');
            } else {
                // create new user with encrypted password
                return bcrypt.hash(password, 10);
            }
        }).then(hashedPassword => {
            let user = new User({
                username,
                email,
                password: hashedPassword
            });
            return user.save();
        }).then(() => {
            resolve();
        }).catch(err => {
            reject(err);
        });
    });
}

exports.login = (email, password) => {
    return new Promise((resolve, reject) => {
        User.findOne({email}).then(user => {
            if(!user) {
                reject('User not found');
            } else {
                bcrypt.compare(password, user.password).then(same => {
                    if(!same) {
                        reject('Incorrect password');
                    } else {
                        resolve({
                            id: user._id,
                            isAdmin: user.isAdmin
                        });
                    }
                });
            }
        }).catch(err => {
            reject(err);
        });
    });
}