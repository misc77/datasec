/*
 * Initation
 */
var Model = require('../models/models.js');
var ZutrittsmittelStatus = Model.ZutrittsmittelStatus;

exports.create = function (req, res){
   var status = new ZutrittsmittelStatus();
    status.set('bezeichnung', req.body.bezeichnung);
    status.set('display', req.body.bezeichnung);
    status.set('beschreibung', req.body.beschreibung); 
    status.set('gueltig', req.body.gueltig);
    status.save(function(err){
        if(err){
            console.log('err: ' + err);
        } else {
            res.json(status);
        }
    });
};

exports.delete = function (req, res){
    ZutrittsmittelStatus.findOneAndRemove({_id: req.body._id}, function(err){
        if (err){
            console.log('err: ' + err);
        } else {
            res.json({msg: 'Objekt gelöscht'});
        }
    });
};

exports.save = function (req, res){
    ZutrittsmittelStatus.findOne({_id: req.body._id}).exec(function(err, status) {
        if (err) {
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            if (req.body.bezeichnung !== undefined & req.body.bezeichnung !== null) {
                status.bezeichnung = req.body.bezeichnung;
                status.display = req.body.bezeichnung;
            }
            if (req.body.beschreibung !== undefined & req.body.beschreibung !== null) {
                status.beschreibung = req.body.beschreibung;
            }
            if (req.body.gueltig === undefined | req.body.gueltig === null ){
                status.gueltig = false;
            } else {
                status.gueltig = true;
            }
            status.save(
                function(err){
                    if(err){
                        console.log('err: ' + err);
                    } else {
                        res.json(status);
                    }
                }
            );
        }
    }); 
};

exports.list = function(req, res){
    ZutrittsmittelStatus.find().exec(function(err, status) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            res.send(status);
        }
    });
};

exports.get = function(req, res){
    ZutrittsmittelStatus.find({_id: req.query['id']}).exec(function(err, status) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            res.json({object : status});
        }
    });
};