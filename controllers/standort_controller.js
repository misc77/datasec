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

exports.list = function(req, res){
    console.log('in list..');
    Standort.find().exec(function(err, standorte) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            console.log('standorte: ' + standorte );
            res.send(standorte);
        }
    });
};

exports.get = function(req,res){
    console.log('in get..');
    console.log('find: ' + req.body.standort);
    Standort.find({_id: req.body.standort}).exec(function(err, standort) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            console.log('standort: ' + standort );
            res.send(standort);
        }
    });
};