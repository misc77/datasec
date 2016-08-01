/*
 * Initation
 */
var Model = require('../models/models.js');
var Rechte = Model.Rechte;

exports.create = function (req, res){
   var rechte = new Rechte();
    rechte.set('bezeichnung', req.body.bezeichnung);
    rechte.set('display', req.body.bezeichnung);
    rechte.set('beschreibung', req.body.beschreibung); 
    rechte.save(function(err){
        if(err){
            console.log('err: ' + err);
        } else {
            res.json(rechte);
        }
    });
};

exports.delete = function (req, res){
    Rechte.findOneAndRemove({_id: req.body._id}, function(err){
        if (err){
            console.log('err: ' + err);
        } else {
            res.json({msg: 'Objekt gelöscht'});
        }
    });
};

exports.save = function (req, res){
    Rechte.findOne({_id: req.body._id}).exec(function(err, rechte) {
        if (err) {
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            if (req.body.bezeichnung !== undefined & req.body.bezeichnung !== null) {
                rechte.bezeichnung = req.body.bezeichnung;
                rechte.display = req.body.bezeichnung;
            }
            if (req.body.beschreibung !== undefined & req.body.beschreibung !== null) {
                rechte.beschreibung = req.body.beschreibung;
            }
            rechte.save(
                function(err){
                    if(err){
                        console.log('err: ' + err);
                    } else {
                        res.json(rechte);
                    }
                }
            );
        }
    }); 
};

exports.list = function(req, res){
    Rechte.find().exec(function(err, rechte) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            res.send(rechte);
        }
    });
};

exports.get = function(req, res){
    Rechte.find({_id: req.query['id']}).exec(function(err, rechte) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            res.json({object : rechte});
        }
    });
};