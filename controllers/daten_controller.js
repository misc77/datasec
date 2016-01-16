/*
 * Initation
 */
var Model = require('../models/models.js');
var Daten = Model.Daten;

exports.create = function (req, res){
    console.log('sens: ' + req.body.sensibel);
    console.log('bez: ' + req.body.bezeichnung);
    
    var daten = new Daten();
    daten.set('bezeichnung', req.body.bezeichnung);
    daten.set('sensibel', req.body.sensibel); 
    daten.save(function(err){
        if(err){
            console.log('err: ' + err);
        } else {
            res.json(daten);
        }
    });
};

exports.delete = function (req, res){
    Daten.findOneAndRemove({_id: req.body._id}, function(err){
        if (err){
            console.log('err: ' + err);
        } else {
            res.json({msg: 'Objekt gelöscht'});
        }
    });
};

exports.save = function (req, res){
    Daten.findOne({_id: req.body._id}).exec(function(err, daten) {
        if (err) {
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            if (req.body.bezeichnung !== undefined & req.body.bezeichnung !== null) {
                daten.bezeichnung = req.body.bezeichnung;
            }
            if (req.body.sensibel === undefined | req.body.sensibel === null ){
                daten.sensibel = false;
            } else {
                daten.sensibel = true;
            }
            daten.save(
                function(err){
                    if(err){
                        console.log('err: ' + err);
                    } else {
                        res.json(daten);
                    }
                }
            );
        }
    }); 

    
};

exports.list = function(req, res){
    Daten.find().exec(function(err, daten) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            res.send(daten);
        }
    });
};

exports.get = function(req, res){
    Daten.find({_id: req.query['id']}).exec(function(err, daten) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            console.log('standort: ' + daten );
            res.json({object : daten});
        }
    });
};