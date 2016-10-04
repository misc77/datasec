var Model = require('../models/models.js');
var Fahrzeug = Model.Fahrzeug;

exports.create = function (req, res){
   var fahrzeug = new Fahrzeug();
    fahrzeug.set('display', req.body.kennzeichen);
    fahrzeug.set('kennzeichen', req.body.kennzeichen);
    fahrzeug.set('beschreibung', req.body.beschreibung); 
    fahrzeug.set('standort', req.body.standort);
    fahrzeug.set('aktiv', req.body.aktiv);
    fahrzeug.set('navigation', req.body.navigation);
    fahrzeug.set('identnummer', req.body.identnummer);
    fahrzeug.set('reset', req.body.reset);
    fahrzeug.save(function(err){
        if(err){
            console.log('err: ' + err);
        } else {
            res.json(fahrzeug);
        }
    });
};

exports.delete = function (req, res){
    Fahrzeug.findOneAndRemove({_id: req.body._id}, function(err){
        if (err){
            console.log('err: ' + err);
        } else {
            res.json({msg: 'Objekt gelöscht'});
        }
    });
};

exports.save = function (req, res){
    Fahrzeug.findOne({_id: req.body._id}).exec(function(err, fahrzeug) {
        if (err) {
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            if (req.body.kennzeichen !== undefined & req.body.kennzeichen !== null) {
                fahrzeug.kennzeichen = req.body.kennzeichen;
                fahrzeug.display = req.body.kennzeichen;
            }
            if (req.body.beschreibung !== undefined & req.body.beschreibung !== null) {
                fahrzeug.land = req.body.beschreibung;
            }
            if (req.body.standort !== undefined & req.body.standort !== null) {
                fahrzeug.standort = req.body.standort;
            }
            if (req.body.identnummer !== undefined & req.body.identnummer !== null) {
                fahrzeug.identnummer = req.body.identnummer;
            }
            if (req.body.aktiv === undefined | req.body.aktiv === null | req.body.aktiv === false){
                fahrzeug.aktiv = false;
            } else {
                fahrzeug.aktiv = true;
            }
            if (req.body.navigation === undefined | req.body.navigation === null | req.body.navigation === false){
                fahrzeug.navigation = false;
            } else {
                fahrzeug.navigation = true;
            }
            if (req.body.reset === undefined | req.body.reset === null | req.body.reset === false){
                fahrzeug.reset = false;
            } else {
                fahrzeug.reset = true;
            }
            fahrzeug.save(
                function(err){
                    if(err){
                        console.log('err: ' + err);
                    } else {
                        res.json(fahrzeug);
                    }
                }
            );
        }
    }); 
};

exports.list = function(req, res){
    Fahrzeug.find().exec(function(err, fahrzeuge) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            res.send(fahrzeuge);
        }
    });
};

exports.get = function(req, res){
    Fahrzeug.find({_id: req.query['id']})
            .populate('standort')
            .exec(function(err, fahrzeug) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            res.json({object : fahrzeug});
        }
    });
};
