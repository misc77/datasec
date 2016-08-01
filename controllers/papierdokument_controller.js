/*
 * Initation
 */
var Model = require('../models/models.js');
var Papierdokument = Model.Papierdokument;

exports.create = function (req, res){
   var papierdokument = new Papierdokument();
    papierdokument.set('bezeichnung', req.body.bezeichnung);
    papierdokument.set('display', req.body.bezeichnung);
    papierdokument.set('beschreibung', req.body.beschreibung); 
    papierdokument.set('aktiv', req.body.aktiv);
    papierdokument.set('daten', req.body.daten);
    papierdokument.save(function(err){
        if(err){
            console.log('err: ' + err);
        } else {
            res.json(papierdokument);
        }
    });
};

exports.delete = function (req, res){
    Papierdokument.findOneAndRemove({_id: req.body._id}, function(err){
        if (err){
            console.log('err: ' + err);
        } else {
            res.json({msg: 'Objekt gelöscht'});
        }
    });
};

exports.save = function (req, res){
    Papierdokument.findOne({_id: req.body._id}).exec(function(err, papierdokument) {
        if (err) {
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            if (req.body.bezeichnung !== undefined & req.body.bezeichnung !== null) {
                papierdokument.bezeichnung = req.body.bezeichnung;
                papierdokument.display = req.body.bezeichnung;
            }
            if (req.body.beschreibung !== undefined & req.body.beschreibung !== null) {
                papierdokument.beschreibung = req.body.beschreibung;
            }
            if (req.body.aktiv === undefined | req.body.aktiv === null ){
                papierdokument.aktiv = false;
            } else {
                papierdokument.aktiv = true;
            }
            if (req.body.daten !== null & req.body.daten !== undefined & req.body.daten.length > 0){
                papierdokument.daten = req.body.daten;
            }
            papierdokument.save(
                function(err){
                    if(err){
                        console.log('err: ' + err);
                    } else {
                        res.json(papierdokument);
                    }
                }
            );
        }
    }); 
};

exports.list = function(req, res){
    Papierdokument.find()
            .populate('daten')
            .exec(function(err, papierdokument) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            res.send(papierdokument);
        }
    });
};

exports.list_active = function(req, res){
    Papierdokument.find({active:true})
            .populate('daten')
            .exec(function(err, papierdokument) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            res.send(papierdokument);
        }
    });
};

exports.get = function(req, res){
    Papierdokument.find({_id: req.query['id']})
            .populate('daten')
            .exec(function(err, papierdokument) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            res.json({object : papierdokument});
        }
    });
};