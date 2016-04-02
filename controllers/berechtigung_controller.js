/*
 * Initation
 */
var Model = require('../models/models.js');
var Berechtigung = Model.Berechtigung;

exports.create = function (req, res){
   var berechtigung = new Berechtigung();
    berechtigung.set('bezeichnung', req.body.bezeichnung);
    berechtigung.set('beschreibung', req.body.beschreibung); 
    berechtigung.save(function(err){
        if(err){
            console.log('err: ' + err);
        } else {
            res.json(berechtigung);
        }
    });
};

exports.delete = function (req, res){
    Berechtigung.findOneAndRemove({_id: req.body._id}, function(err){
        if (err){
            console.log('err: ' + err);
        } else {
            res.json({msg: 'Objekt gelöscht'});
        }
    });
};

exports.save = function (req, res){
    Berechtigung.findOne({_id: req.body._id}).exec(function(err, berechtigung) {
        if (err) {
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            if (req.body.bezeichnung !== undefined & req.body.bezeichnung !== null) {
                berechtigung.bezeichnung = req.body.bezeichnung;
            }
            if (req.body.beschreibung !== undefined & req.body.beschreibung !== null) {
                berechtigung.beschreibung = req.body.beschreibung;
            }
            berechtigung.save(
                function(err){
                    if(err){
                        console.log('err: ' + err);
                    } else {
                        res.json(berechtigung);
                    }
                }
            );
        }
    }); 
};

exports.list = function(req, res){
    Berechtigung.find().exec(function(err, berechtigung) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            res.send(berechtigung);
        }
    });
};

exports.get = function(req, res){
    Berechtigung.find({_id: req.query['id']}).exec(function(err, berechtigung) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            res.json({object : berechtigung});
        }
    });
};