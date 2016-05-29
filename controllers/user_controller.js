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

exports.create = function (req, res){
   var user = new User();
    user.set('name', req.body.kennzeichen);
    user.set('pwd', hashPW(req.body.password)); 
    user.set('email', req.body.email);
    user.set('aktiv', req.body.aktiv);
    user.set('rolle', req.body.rolle);
    user.set('locked', req.body.locked);
    user.set('mitarbeiter', req.body.mitarbeiter);
    user.set('raum', req.body.raum);
    user.set('ressource', req.body.ressource);
    user.set('hardware', req.body.hardware);
    user.set('fuhrpark', req.body.fuhrpark);
    user.set('hardware', req.body.hardware);
    user.set('rechte', req.body.rechte);
    user.set('musterrolle', req.body.musterrolle);
    user.set('auswertungen', req.body.auswertungen);
    user.set('dokumente', req.body.dokumente);
    user.set('befugnisse', req.body.befugnisse);
    user.set('aufgabe', req.body.aufgabe);
    user.set('beschaeftigung', req.body.beschaeftigung);
    user.set('datentyp', req.body.datentyp);
    user.set('ressourcentyp', req.body.ressourcentyp);
    user.set('tresor', req.body.tresor);
    user.set('standort', req.body.standort);
    user.set('zutrittsmittel', req.body.zutrittsmittel);
    user.set('mitarbeiterstatus', req.body.mitarbeiterstatus);
    user.set('zutrittsmittelstatus', req.body.zutrittsmittelstatus);
    user.set('admin', req.body.admin);
    user.save(function(err){
        if(err){
            console.log('err: ' + err);
        } else {
            res.json(user);
        }
    });
};

exports.save = function (req, res){
    User.findOne({_id: req.body._id}).exec(function(err, user) {
        if (err) {
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            if (req.body.name !== undefined & req.body.name !== null) {
                user.name = req.body.name;
            }
            if (req.body.email !== undefined | req.body.email !== null ){
                user.email = req.body.email;
            }
            if (req.body.aktiv === undefined | req.body.aktiv === null | req.body.aktiv === false){
                user.aktiv = false;
            } else {
                user.aktiv = true;
            }
            if (req.body.rolle !== null & req.body.rolle !== undefined ){
                user.rolle = req.body.rolle;
            }
            if (req.body.locked === undefined | req.body.locked === null | req.body.locked === false){
                user.locked = false;
            } else {
                user.locked = true;
            }
            if (req.body.mitarbeiter === undefined | req.body.mitarbeiter === null | req.body.mitarbeiter === false){
                user.mitarbeiter = false;
            } else {
                user.mitarbeiter = true;
            }
            if (req.body.raum === undefined | req.body.raum === null | req.body.raum === false){
                user.raum = false;
            } else {
                user.raum = true;
            }            
            if (req.body.ressource === undefined | req.body.ressource === null | req.body.ressource === false){
                user.ressource = false;
            } else {
                user.ressource = true;
            }
            if (req.body.hardware === undefined | req.body.hardware === null | req.body.hardware === false){
                user.hardware = false;
            } else {
                user.hardware = true;
            }
            if (req.body.rechte === undefined | req.body.rechte === null | req.body.rechte === false){
                user.rechte = false;
            } else {
                user.rechte = true;
            }            
            if (req.body.musterrolle === undefined | req.body.musterrolle === null | req.body.musterrolle === false){
                user.musterrolle = false;
            } else {
                user.musterrolle = true;
            }            
            if (req.body.auswertungen === undefined | req.body.auswertungen === null | req.body.auswertungen === false){
                user.auswertungen = false;
            } else {
                user.auswertungen = true;
            }            
            if (req.body.dokumente === undefined | req.body.dokumente === null | req.body.dokumente === false){
                user.dokumente = false;
            } else {
                user.dokumente = true;
            }
            if (req.body.befugnisse === undefined | req.body.befugnisse === null | req.body.befugnisse === false){
                user.befugnisse = false;
            } else {
                user.befugnisse = true;
            }
            if (req.body.aufgabe === undefined | req.body.aufgabe === null | req.body.aufgabe === false){
                user.aufgabe = false;
            } else {
                user.aufgabe = true;
            }
            if (req.body.beschaeftigung === undefined | req.body.beschaeftigung === null | req.body.beschaeftigung === false){
                user.beschaeftigung = false;
            } else {
                user.beschaeftigung = true;
            }
            if (req.body.datentyp === undefined | req.body.datentyp === null | req.body.datentyp === false){
                user.datentyp = false;
            } else {
                user.datentyp = true;
            }
            if (req.body.ressourcentyp === undefined | req.body.ressourcentyp === null | req.body.ressourcentyp === false){
                user.ressourcentyp = false;
            } else {
                user.ressourcentyp = true;
            }
            if (req.body.tresor === undefined | req.body.tresor === null | req.body.tresor === false){
                user.tresor = false;
            } else {
                user.tresor = true;
            }
            if (req.body.zutrittsmittel === undefined | req.body.zutrittsmittel === null | req.body.zutrittsmittel === false){
                user.zutrittsmittel = false;
            } else {
                user.zutrittsmittel = true;
            }
            if (req.body.mitarbeiterstatus === undefined | req.body.mitarbeiterstatus === null | req.body.mitarbeiterstatus === false){
                user.mitarbeiterstatus = false;
            } else {
                user.mitarbeiterstatus = true;
            }
            if (req.body.zutrittsmittelstatus === undefined | req.body.zutrittsmittelstatus === null | req.body.zutrittsmittelstatus === false){
                user.zutrittsmittelstatus = false;
            } else {
                user.zutrittsmittelstatus = true;
            }
            if (req.body.standort === undefined | req.body.standort === null | req.body.standort === false){
                user.standort = false;
            } else {
                user.standort = true;
            }
            if (req.body.admin === undefined | req.body.admin === null | req.body.admin === false){
                user.admin = false;
            } else {
                user.admin = true;
            }
            user.save(
                function(err){
                    if(err){
                        console.log('err: ' + err);
                    } else {
                        res.json(user);
                    }
                }
            );
        }
    }); 
};

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

exports.delete = function(req, res) {
     User.findOneAndRemove({_id: req.body._id}, function(err){
        if (err){
            console.log('err: ' + err);
        } else {
            res.json({msg: 'Objekt gelöscht'});
        }
    });
};

exports.list = function(req, res){
    User.find()
            .populate('rolle')
            .exec(function(err, user) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            res.send(user);
        }
    });
};

exports.get = function(req, res){
    User.find({_id: req.query['id']})
            .populate('rolle')
            .exec(function(err, user) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            res.json({object : user});
        }
    });
};