/*
 * Initation
 */
var Model = require('../models/models.js');
var Rolle = Model.Rolle;

exports.create = function (req, res){
   var rolle = new Rolle();
    rolle.set('bezeichnung', req.body.bezeichnung);
    rolle.set('display', req.body.bezeichnung);
    rolle.set('beschreibung', req.body.beschreibung); 
    rolle.set('aktiv', req.body.aktiv);
    rolle.save(function(err){
        if(err){
            console.log('err: ' + err);
        } else {
            res.json(rolle);
        }
    });
};

exports.delete = function (req, res){
    Rolle.findOneAndRemove({_id: req.body._id}, function(err){
        if (err){
            console.log('err: ' + err);
        } else {
            res.json({msg: 'Objekt gelöscht'});
        }
    });
};

exports.save = function (req, res){
    Rolle.findOne({_id: req.body._id}).exec(function(err, rolle) {
        if (err) {
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            if (req.body.bezeichnung !== undefined & req.body.bezeichnung !== null) {
                rolle.bezeichnung = req.body.bezeichnung;
                rolle.display = req.body.bezeichnung;
            }
            if (req.body.beschreibung !== undefined & req.body.beschreibung !== null) {
                rolle.beschreibung = req.body.beschreibung;
            }
            if (req.body.aktiv === undefined | req.body.aktiv === null ){
                rolle.aktiv = false;
            } else {
                rolle.aktiv = true;
            }
            rolle.save(
                function(err){
                    if(err){
                        console.log('err: ' + err);
                    } else {
                        res.json(rolle);
                    }
                }
            );
        }
    }); 
};

exports.list = function(req, res){
    Rolle.find().exec(function(err, rollen) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            res.send(rollen);
        }
    });
};

exports.get = function(req, res){
    Rolle.find({_id: req.query['id']}).exec(function(err, rolle) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            res.json({object : rolle});
        }
    });
};