/*
 * Initation
 */
var Model = require('../models/models.js');
var MitarbeiterStatus = Model.MitarbeiterStatus;

exports.create = function (req, res){
   var status = new MitarbeiterStatus();
    status.set('bezeichnung', req.body.bezeichnung);
    status.set('display', req.body.bezeichnung);
    status.set('beschreibung', req.body.beschreibung); 
    status.set('aktiv_status', req.body.aktiv_status);
    status.save(function(err){
        if(err){
            console.log('err: ' + err);
        } else {
            res.json(status);
        }
    });
};

exports.delete = function (req, res){
    MitarbeiterStatus.findOneAndRemove({_id: req.body._id}, function(err){
        if (err){
            console.log('err: ' + err);
        } else {
            res.json({msg: 'Objekt gelöscht'});
        }
    });
};

exports.save = function (req, res){
    MitarbeiterStatus.findOne({_id: req.body._id}).exec(function(err, status) {
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
            if (req.body.aktiv_status === undefined | req.body.aktiv_status === null ){
                status.aktiv_status = false;
            } else {
                status.aktiv_status = true;
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
    MitarbeiterStatus.find().exec(function(err, status) {
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
    MitarbeiterStatus.find({_id: req.query['id']}).exec(function(err, status) {
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