/*
 * Initation
 */
var crypto = require('crypto');
var Model = require('../models/models.js');
var User = Model.User;

/*
 * hashPW
 * encodes password as base64 string.
 * @param {type} pwd
 * @returns {String} hashed Password
 */
function hashPW(pwd){
    return crypto.createHash('sha256').update(pwd).digest('base64').toString();
}
/*
 * SIGNUP
 */
exports.signup = function(req, res){
    console.log('in signup...');
    var user = new User();
    console.log('name: ' + req.body.username);
    console.log('pwd: ' + req.body.password);
    console.log('email: ' + req.body.email);
    user.set('name', req.body.username);
    console.log('user set');
    user.set('pwd', hashPW(req.body.password));
    user.set('email', req.body.email);
    user.save(function(err){
        if(err){
            console.log('err: ' + err);
            res.redirect(user, '/signup');
        } else {
            res.redirect(user, '/');
        }
    });
};

/*
 * Login
 */
exports.login = function(req, res){
    console.log('in login... username: ' + req.body.username);
    User.findOne({name: req.body.username})
            .exec(function(err, user){
                if(user === undefined | user === null){
                     err = 'User Not Found!';
                } else if (user.pwd === hashPW(req.body.password.toString())) {
                    req.session.regenerate(function(){
                        req.session.user = user.id;
                        req.session.username = user.name;
                        req.session.msg = 'Logged in as ' + user.name;
                        res.redirect('/');
                    });
                } else {
                    err = 'Authentication failed!';
                }
                
                if(err){
                    console.log('error: ' + err);
                    req.session.regenerate(function(){
                        res.redirect('/');
                    });
                }
    });
};

/*
 * Get User
 */
exports.getUserProfile = function(req, res){
    User.findOne({ _id: req.session.user })
            .exec(function(err, user){
                if(user){
                    res.json(404, {err: 'User Not Found!'});
                } else {
                    res.json(user);
                }
    });
};

/*
 * Update User
 */
exports.updateUser = function(req, res, dataService){
    User.findOne({ _id: req.session.user })
            .exec(function(err, user, dataService){
                user.set('email', req.body.email);
                user.save(function(err){
                    if(err){
                        req.session.err = err;
                    } else {
                        req.session.msg = 'User updated!';
                    }
                    res.redirect('/user');
                });
            });
};

/**
 * Counts users
 * @param {type} req
 * @param {type} res
 * @returns {undefined}
 */
exports.checkIsInit = function(req, res){
    User.find().count(function(err, count){
        console.log('user.count=' + count);
        if (count > 0) {
            res.redirect('/login');
        } else {
            res.redirect('/signup');
        }
    });
};

/*
 * Delete User
 */
exports.deleteUser = function(req, res, dataService){
    User.findOne({ _id: req.session.user })
            .exec(function(err, user, dataService){
                if(user){
                    user.remove(function(err, dataService){
                        if(err){
                            req.session.err = err;
                        }
                        req.session.destroy(function(){
                            res.redirect('/login');
                        });
                    });
                } else {
                    req.session.err = 'User not found!';
                    req.session.destroy(function(){
                        res.redirect('/login');
                    });
                }
    });
};