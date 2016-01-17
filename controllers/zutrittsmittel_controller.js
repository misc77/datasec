/*
 * Initation
 */
var Model = require('../models/models.js');
var Zutrittsmittel = Model.Zutrittsmittel;

exports.create = function (req, res){
   console.log('daten: ' + req.body.toString());
   var zutrittsmittel = new Zutrittsmittel();
    zutrittsmittel.set('bezeichnung', req.body.bezeichnung);
    zutrittsmittel.set('beschreibung', req.body.beschreibung); 
    zutrittsmittel.set('status', req.body.status);
    zutrittsmittel.set('ausgabe', req.body.ausgabe);
    zutrittsmittel.set('rueckgabe', req.body.rueckgabe);
    zutrittsmittel.save(function(err){
        if(err){
            console.log('err: ' + err);
        } else {
            res.json(zutrittsmittel);
        }
    });
};

exports.delete = function (req, res){
    Zutrittsmittel.findOneAndRemove({_id: req.body._id}, function(err){
        if (err){
            console.log('err: ' + err);
        } else {
            res.json({msg: 'Objekt gelöscht'});
        }
    });
};

exports.save = function (req, res){
    Zutrittsmittel.findOne({_id: req.body._id}).exec(function(err, zutrittsmittel) {
        if (err) {
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            if (req.body.bezeichnung !== undefined & req.body.bezeichnung !== null) {
                zutrittsmittel.bezeichnung = req.body.bezeichnung;
            }
            if (req.body.beschreibung !== undefined & req.body.beschreibung !== null) {
                zutrittsmittel.beschreibung = req.body.beschreibung;
            }
            if (req.body.status !== undefined & req.body.status !== null) {
                zutrittsmittel.status = req.body.status;
            }
            if (req.body.ausgabe !== undefined & req.body.ausgabe !== null) {
                zutrittsmittel.ausgabe = req.body.ausgabe;
            }
            if (req.body.rueckgabe !== undefined & req.body.rueckgabe !== null) {
                zutrittsmittel.rueckgabe = req.body.rueckgabe;
            }
            zutrittsmittel.save(
                function(err){
                    if(err){
                        console.log('err: ' + err);
                    } else {
                        res.json(zutrittsmittel);
                    }
                }
            );
        }
    }); 
};

exports.list = function(req, res){
    Zutrittsmittel.find()
            .populate('status')
            .exec(function(err, zutrittsmittel) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            res.send(zutrittsmittel);
        }
    });
};

exports.get = function(req, res){
    Zutrittsmittel.find({_id: req.query['id']})
            .populate('status')
            .exec(function(err, zutrittsmittel) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            res.json({object : zutrittsmittel});
        }
    });
};