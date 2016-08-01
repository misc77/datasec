/*
 * Initation
 */
var Model = require('../models/models.js');
var Beschaeftigung = Model.Beschaeftigung;

exports.create = function (req, res){
   var beschaeftigung = new Beschaeftigung();
    beschaeftigung.set('bezeichnung', req.body.bezeichnung);
    beschaeftigung.set('display', req.body.bezeichnung);
    beschaeftigung.set('beschreibung', req.body.beschreibung); 
    beschaeftigung.set('aktiv', req.body.aktiv);
    beschaeftigung.save(function(err){
        if(err){
            console.log('err: ' + err);
        } else {
            res.json(beschaeftigung);
        }
    });
};

exports.delete = function (req, res){
    Beschaeftigung.findOneAndRemove({_id: req.body._id}, function(err){
        if (err){
            console.log('err: ' + err);
        } else {
            res.json({msg: 'Objekt gelöscht'});
        }
    });
};

exports.save = function (req, res){
    Beschaeftigung.findOne({_id: req.body._id}).exec(function(err, beschaeftigung) {
        if (err) {
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            if (req.body.bezeichnung !== undefined & req.body.bezeichnung !== null) {
                beschaeftigung.bezeichnung = req.body.bezeichnung;
                beschaeftigung.display = req.body.bezeichnung;
            }
            if (req.body.beschreibung !== undefined & req.body.beschreibung !== null) {
                beschaeftigung.beschreibung = req.body.beschreibung;
            }
            if (req.body.aktiv === undefined | req.body.aktiv === null ){
                beschaeftigung.aktiv = false;
            } else {
                beschaeftigung.aktiv = true;
            }
            beschaeftigung.save(
                function(err){
                    if(err){
                        console.log('err: ' + err);
                    } else {
                        res.json(beschaeftigung);
                    }
                }
            );
        }
    }); 
};

exports.list = function(req, res){
    Beschaeftigung.find().exec(function(err, beschaeftigung) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            res.send(beschaeftigung);
        }
    });
};

exports.get = function(req, res){
    Beschaeftigung.find({_id: req.query['id']}).exec(function(err, beschaeftigung) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            res.json({object : beschaeftigung});
        }
    });
};