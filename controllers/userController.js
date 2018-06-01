const mongoose = require('mongoose');
const User = mongoose.model('users');

exports.getAll = (cb) => {
    User.find({})                
        .then(users => {
           return cb(users);
        })
        .catch(error => {
            console.log(error);
        });
};

exports.addRole = () => {

}

exports.removeRole = () => {

}

exports.toggleAccess = (id, cb) => {
    User.find({_id: id})
        .then(users => {
            let user = users[0];
            user.access = user.access ? false:true;
            user.save()
                .then(() => {                    
                    return cb(user);
                })
                .catch(error => {
                    console.log(error);
                    return error;
                })
        })
        .catch(error => {
            console.log(error);
        });
}

exports.toggleAdmin = (id, cb) => {
    User.find({_id: id})
        .then(users => {
            let user = users[0];
            user.role = user.role ? false:true;
            user.save()
                .then(() => {                    
                    return cb(user);
                })
                .catch(error => {
                    console.log(error);
                    return error;
                })
        })
        .catch(error => {
            console.log(error);
        });
}

exports.removeUser = () => {

}