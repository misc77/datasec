/*
 * Initation
 */
var Model = require('../models/models.js');
var Ressource = Model.Ressource;

exports.create = function (req, res){
   var ressource = new Ressource();
    ressource.set('bezeichnung', req.body.bezeichnung);
    ressource.set('beschreibung', req.body.beschreibung); 
    ressource.set('aktiv', req.body.aktiv);
    ressource.set('daten', req.body.daten);
    ressource.save(function(err){
        if(err){
            console.log('err: ' + err);
        } else {
            res.json(ressource);
        }
    });
};

exports.delete = function (req, res){
    Ressource.findOneAndRemove({_id: req.body._id}, function(err){
        if (err){
            console.log('err: ' + err);
        } else {
            res.json({msg: 'Objekt gelöscht'});
        }
    });
};

exports.save = function (req, res){
    Ressource.findOne({_id: req.body._id}).exec(function(err, ressource) {
        if (err) {
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            if (req.body.bezeichnung !== undefined & req.body.bezeichnung !== null) {
                ressource.bezeichnung = req.body.bezeichnung;
            }
            if (req.body.beschreibung !== undefined & req.body.beschreibung !== null) {
                ressource.beschreibung = req.body.beschreibung;
            }
            if (req.body.aktiv === undefined | req.body.aktiv === null ){
                ressource.aktiv = false;
            } else {
                ressource.aktiv = true;
            }
            if (req.body.daten !== null & req.body.daten !== undefined & req.body.daten.length > 0){
                ressource.daten = req.body.daten;
            }
            ressource.save(
                function(err){
                    if(err){
                        console.log('err: ' + err);
                    } else {
                        res.json(ressource);
                    }
                }
            );
        }
    }); 
};

exports.list = function(req, res){
    Ressource.find()
            .populate('daten')
            .exec(function(err, ressource) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            res.send(ressource);
        }
    });
};

exports.list_active = function(req, res){
    Ressource.find({active: true})
            .populate('daten')
            .exec(function(err, ressource) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            res.send(ressource);
        }
    });
};

exports.get = function(req, res){
    Ressource.find({_id: req.query['id']})
            .populate('daten')
            .exec(function(err, ressource) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            res.json({object : ressource});
        }
    });
};