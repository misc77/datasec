/*
 * Initation
 */
var Model = require('../models/models.js');
var Raum = Model.Raum;

exports.create = function (req, res){
   var raum = new Raum();
    raum.set('bezeichnung', req.body.bezeichnung);
    raum.set('display', req.body.bezeichnung);
    raum.set('beschraenkt', req.body.beschraenkt);
    raum.set('zutrittvon', req.body.zutrittvon);
    raum.set('zutrittbis', req.body.zutrittbis);
    raum.set('zutrittsmittel', req.body.zutrittsmittel);
    raum.set('daten', req.body.daten);
    raum.save(function(err){
        if(err){
            console.log('err: ' + err);
        } else {
            res.json(raum);
        }
    });
};

exports.delete = function (req, res){
    Raum.findOneAndRemove({_id: req.body._id}, function(err){
        if (err){
            console.log('err: ' + err);
        } else {
            res.json({msg: 'Objekt gelöscht'});
        }
    });
};

exports.save = function (req, res){
    Raum.findOne({_id: req.body._id}).exec(function(err, raum) {
        if (err) {
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            if (req.body.bezeichnung !== undefined & req.body.bezeichnung !== null) {
                raum.bezeichnung = req.body.bezeichnung;
                raum.display = req.body.bezeichnung;
            }
            if (req.body.zutrittvon !== undefined & req.body.zutrittvon !== null) {
                raum.zutrittvon = req.body.zutrittvon;
            }
            if (req.body.zutrittbis !== undefined & req.body.zutrittbis !== null) {
                raum.zutrittbis = req.body.zutrittbis;
            }
            if (req.body.beschraenkt === undefined | req.body.beschraenkt === null ){
                raum.beschraenkt = false;
            } else {
                raum.beschraenkt = true;
            }
            if (req.body.daten !== null & req.body.daten !== undefined & req.body.daten.length > 0){
                raum.daten = req.body.daten;
            }
            if (req.body.zutrittsmittel !== null & req.body.zutrittsmittel !== undefined & req.body.zutrittsmittel.length > 0){
                raum.daten = req.body.zutrittsmittel;
            }
            raum.save(
                function(err){
                    if(err){
                        console.log('err: ' + err);
                    } else {
                        res.json(raum);
                    }
                }
            );
        }
    }); 
};

exports.list = function(req, res){
    Raum.find()
            .populate('daten')
            .populate('zutrittsmittel')
            .exec(function(err, raum) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            res.send(raum);
        }
    });
};

exports.get = function(req, res){
    Raum.find({_id: req.query['id']})
            .populate('daten')
            .populate('zutrittsmittel')
            .exec(function(err, raum) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            res.json({object : raum});
        }
    });
};