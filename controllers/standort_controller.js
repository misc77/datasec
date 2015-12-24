/*
 * Initation
 */
var Model = require('../models/models.js');
var Standort = Model.Standort;

exports.create = function (req, res){
    console.log('in standort create');
    console.log('param1: ' + req.body.bezeichnung);
    console.log('param2: ' + req.body.land);
    console.log('param3: ' + req.body.hauptstandort);
    console.log('param4: ' + req.body.gruendung);
    console.log('param5: ' + req.body.schliessung);
     
    var standort = new Standort();
    standort.set('bezeichnung', req.body.bezeichnung);
    standort.set('land', req.body.land);
   
    standort.set('hauptstandort', req.body.hauptstandort.toString());
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

exports.save = function (req, res){
    console.log('in standort save');
    console.log('param1: ' + req.body.bezeichnung);
    console.log('param2: ' + req.body.land);
    console.log('param3: ' + req.body.hauptstandort);
    console.log('param4: ' + req.body.gruendung);
    console.log('param5: ' + req.body.schliessung);
    console.log('param6: ' + req.body._id);
    
   
    Standort.findOne({_id: req.body._id}).exec(function(err, standort) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            console.log('_id: ' + standort._id);
            if (req.body.bezeichnung !== undefined & req.body.bezeichnung !== null) {
                console.log('setting bezeichnung: ' + req.body.bezeichnung);
                standort.bezeichnung = req.body.bezeichnung;
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
    console.log('in list..');
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

exports.get = function(req, res){
    console.log('in get..');
    Standort.find({_id: req.query['id']}).exec(function(err, standort) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            console.log('standort: ' + standort );
            res.json({standort : standort});
        }
    });
};