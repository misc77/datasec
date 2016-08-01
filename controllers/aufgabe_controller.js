/*
 * Initation
 */
var Model = require('../models/models.js');
var Aufgabe = Model.Aufgabe;

exports.create = function (req, res){
   var aufgabe = new Aufgabe();
    aufgabe.set('bezeichnung', req.body.bezeichnung);
    aufgabe.set('beschreibung', req.body.beschreibung); 
    aufgabe.set('display', req.body.bezeichnung);
    aufgabe.set('aktiv', req.body.aktiv);
    aufgabe.save(function(err){
        if(err){
            console.log('err: ' + err);
        } else {
            res.json(aufgabe);
        }
    });
};

exports.delete = function (req, res){
    Aufgabe.findOneAndRemove({_id: req.body._id}, function(err){
        if (err){
            console.log('err: ' + err);
        } else {
            res.json({msg: 'Objekt gelöscht'});
        }
    });
};

exports.save = function (req, res){
    Aufgabe.findOne({_id: req.body._id}).exec(function(err, aufgabe) {
        if (err) {
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            if (req.body.bezeichnung !== undefined & req.body.bezeichnung !== null) {
                aufgabe.bezeichnung = req.body.bezeichnung;
                aufgabe.display = req.body.bezeichnung;
            }
            if (req.body.beschreibung !== undefined & req.body.beschreibung !== null) {
                aufgabe.beschreibung = req.body.beschreibung;
            }
            if (req.body.aktiv === undefined | req.body.aktiv === null ){
                aufgabe.aktiv = false;
            } else {
                aufgabe.aktiv = true;
            }
            aufgabe.save(
                function(err){
                    if(err){
                        console.log('err: ' + err);
                    } else {
                        res.json(aufgabe);
                    }
                }
            );
        }
    }); 
};

exports.list = function(req, res){
    Aufgabe.find().exec(function(err, aufgaben) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            res.send(aufgaben);
        }
    });
};

exports.get = function(req, res){
    Aufgabe.find({_id: req.query['id']}).exec(function(err, aufgabe) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            res.json({object : aufgabe});
        }
    });
};