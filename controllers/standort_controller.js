/*
 * Initation
 */
var Model = require('../models/models.js');
var Standort = Model.Standort;

exports.create = function (req, res){
    console.log('in standort create');
    console.log('req.body: ' + req.body.toString());
    console.log('req.body.data '+ req.body.data);
    console.log('param1: ' + req.body.data.bezeichnung);
    console.log('param2: ' + req.body.data.land);
    console.log('param3: ' + req.body.data.hauptstandort);
    console.log('param4: ' + req.body.data.gruendung);
    console.log('param5: ' + req.body.data.schliessung);
     
    var standort = new Standort();
    standort.set('bezeichnung', req.body.data.bezeichnung);
    standort.set('land', req.body.data.land);
    standort.set('hauptstandort', req.body.data.hauptstandort);
    standort.set('gruendung', req.body.data.gruendung);
    standort.set('schliessung', req.body.data.schliessung);
    standort.save();
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