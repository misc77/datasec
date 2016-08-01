/*
 * Initation
 */
var Model = require('../models/models.js');
var Standort = Model.Standort;

exports.create = function (req, res){
    console.log('hs: ' + req.body.hauptstandort);
    console.log('bez: ' + req.body.bezeichnung);
    
    var standort = new Standort();
    standort.set('bezeichnung', req.body.bezeichnung);
    standort.set('display', req.body.bezeichnung);
    standort.set('land', req.body.land); 
    standort.set('hauptstandort', req.body.hauptstandort);
    standort.set('gruendung', req.body.gruendung);
    standort.set('schliessung', req.body.schliessung);
    standort.save(function(err){
        if(err){
            console.log('err: ' + err);
        } else {
            res.json(standort);
        }
    });
};

exports.delete = function (req, res){
    Standort.findOneAndRemove({_id: req.body._id}, function(err){
        if (err){
            console.log('err: ' + err);
        } else {
            res.json({msg: 'Objekt gelöscht'});
        }
    });
};

exports.save = function (req, res){
    Standort.findOne({_id: req.body._id}).exec(function(err, standort) {
        if (err) {
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            if (req.body.bezeichnung !== undefined & req.body.bezeichnung !== null) {
                standort.bezeichnung = req.body.bezeichnung;
                standort.display = req.body.bezeichnung;
            }
            if (req.body.land !== undefined & req.body.land !== null) {
                standort.land = req.body.land;
            }
            if (req.body.hauptstandort === undefined | req.body.hauptstandort === null ){
                standort.hauptstandort = false;
            } else {
                standort.hauptstandort = true;
            }
            if (req.body.gruendung !== undefined | req.body.gruendung !== null) {
                standort.gruendung = req.body.gruendung;
            }
            if (req.body.schliessung !== undefined | req.body.schliessung !== null) {
                standort.schliessung = req.body.schliessung;
            }
            standort.save(
                function(err){
                    if(err){
                        console.log('err: ' + err);
                    } else {
                        res.json(standort);
                    }
                }
            );
        }
    }); 

    
};

exports.list = function(req, res){
    Standort.find().exec(function(err, standorte) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            res.send(standorte);
        }
    });
};

exports.list_active = function(req, res){
    Standort.find({schliessung: null}).exec(function(err, standorte) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            res.send(standorte);
        }
    });
};

exports.get = function(req, res){
    Standort.find({_id: req.query['id']}).exec(function(err, standort) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            console.log('standort: ' + standort );
            res.json({object : standort});
        }
    });
};