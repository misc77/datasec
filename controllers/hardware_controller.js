/*
 * Initation
 */
var Model = require('../models/models.js');
var Hardware = Model.Hardware;

exports.create = function (req, res){
   var hardware = new Hardware();
    hardware.set('bezeichnung', req.body.bezeichnung);
    hardware.set('display', req.body.inventarNr + ' (' + req.body.bezeichnung + ')');
    hardware.set('inventarNr', req.body.inventarNr); 
    hardware.set('aktiv', req.body.aktiv);
    hardware.set('deaktiviertAm', req.body.deaktiviertAm);
    hardware.set('quittierung', req.body.quittierung);
    hardware.set('verwendungszweck', req.body.verwendungszweck);
    hardware.set('mobiledevmgmt', req.body.mobiledevmgmt);
    hardware.save(function(err){
        if(err){
            console.log('err: ' + err);
        } else {
            res.json(hardware);
        }
    });
};

exports.delete = function (req, res){
    Hardware.findOneAndRemove({_id: req.body._id}, function(err){
        if (err){
            console.log('err: ' + err);
        } else {
            res.json({msg: 'Objekt gelöscht'});
        }
    });
};

exports.save = function (req, res){
    Hardware.findOne({_id: req.body._id}).exec(function(err, hardware) {
        if (err) {
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            if (req.body.bezeichnung !== undefined & req.body.bezeichnung !== null) {
                hardware.bezeichnung = req.body.bezeichnung;
                hardware.display = req.body.inventarNr + ' (' + req.body.bezeichnung + ')';
            }
            if (req.body.inventarNr !== undefined & req.body.inventarNr !== null) {
                hardware.inventarNr = req.body.inventarNr;
            }
            if (req.body.deaktiviertAm !== undefined & req.body.deaktiviertAm !== null) {
                hardware.deaktiviertAm = req.body.deaktiviertAm;
            }
            if (req.body.aktiv === undefined | req.body.aktiv === null ){
                hardware.aktiv = false;
            } else {
                hardware.aktiv = true;
            }
            if (req.body.quittierung === undefined | req.body.quittierung === null ){
                hardware.quittierung = false;
            } else {
                hardware.quittierung = true;
            }
            if (req.body.mobiledevmgmt === undefined | req.body.mobiledevmgmt === null ){
                hardware.mobiledevmgmt = false;
            } else {
                hardware.mobiledevmgmt = true;
            }
            hardware.save(
                function(err){
                    if(err){
                        console.log('err: ' + err);
                    } else {
                        res.json(hardware);
                    }
                }
            );
        }
    }); 
};

exports.list = function(req, res){
    Hardware.find().exec(function(err, hardwares) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            res.send(hardwares);
        }
    });
};

exports.get = function(req, res){
    Hardware.find({_id: req.query['id']}).exec(function(err, hardware) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            console.log('return: ' + hardware.toString());
            res.json({object : hardware});
        }
    });
};