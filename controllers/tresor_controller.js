/*
 * Initation
 */
var Model = require('../models/models.js');
var Tresor = Model.Tresor;

exports.create = function (req, res){
   var tresor = new Tresor();
    tresor.set('bezeichnung', req.body.bezeichnung);
    tresor.set('display', req.body.bezeichnung);
    tresor.set('beschreibung', req.body.beschreibung); 
    tresor.set('aktiv', req.body.aktiv);
    tresor.set('daten', req.body.daten);
    tresor.save(function(err){
        if(err){
            console.log('err: ' + err);
        } else {
            res.json(tresor);
        }
    });
};

exports.delete = function (req, res){
    Tresor.findOneAndRemove({_id: req.body._id}, function(err){
        if (err){
            console.log('err: ' + err);
        } else {
            res.json({msg: 'Objekt gelöscht'});
        }
    });
};

exports.save = function (req, res){
    Tresor.findOne({_id: req.body._id}).exec(function(err, tresor) {
        if (err) {
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            if (req.body.bezeichnung !== undefined & req.body.bezeichnung !== null) {
                tresor.bezeichnung = req.body.bezeichnung;
                tresor.display = req.body.bezeichnung;
            }
            if (req.body.beschreibung !== undefined & req.body.beschreibung !== null) {
                tresor.beschreibung = req.body.beschreibung;
            }
            if (req.body.aktiv === undefined | req.body.aktiv === null ){
                tresor.aktiv = false;
            } else {
                tresor.aktiv = true;
            }
            if (req.body.daten !== null & req.body.daten !== undefined & req.body.daten.length > 0){
                tresor.daten = req.body.daten;
            }
            tresor.save(
                function(err){
                    if(err){
                        console.log('err: ' + err);
                    } else {
                        res.json(tresor);
                    }
                }
            );
        }
    }); 
};

exports.list = function(req, res){
    Tresor.find()
            .populate('daten')
            .exec(function(err, tresor) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            res.send(tresor);
        }
    });
};

exports.list_active = function(req, res){
    Tresor.find({active:true})
            .populate('daten')
            .exec(function(err, tresor) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            res.send(tresor);
        }
    });
};

exports.get = function(req, res){
    Tresor.find({_id: req.query['id']})
            .populate('daten')
            .exec(function(err, tresor) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            res.json({object : tresor});
        }
    });
};