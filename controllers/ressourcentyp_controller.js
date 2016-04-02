/*
 * Initation
 */
var Model = require('../models/models.js');
var RessourcenTyp = Model.RessourcenTyp;

exports.create = function (req, res){
   var ressourcentyp = new RessourcenTyp();
    ressourcentyp.set('bezeichnung', req.body.bezeichnung);
    ressourcentyp.set('aktiv', req.body.aktiv);
    ressourcentyp.save(function(err){
        if(err){
            console.log('err: ' + err);
        } else {
            res.json(ressourcentyp);
        }
    });
};

exports.delete = function (req, res){
    RessourcenTyp.findOneAndRemove({_id: req.body._id}, function(err){
        if (err){
            console.log('err: ' + err);
        } else {
            res.json({msg: 'Objekt gelöscht'});
        }
    });
};

exports.save = function (req, res){
    RessourcenTyp.findOne({_id: req.body._id}).exec(function(err, ressourcentyp) {
        if (err) {
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            if (req.body.bezeichnung !== undefined & req.body.bezeichnung !== null) {
                ressourcentyp.bezeichnung = req.body.bezeichnung;
            }
            if (req.body.aktiv === undefined | req.body.aktiv === null ){
                ressourcentyp.aktiv = false;
            } else {
                ressourcentyp.aktiv = true;
            }
            ressourcentyp.save(
                function(err){
                    if(err){
                        console.log('err: ' + err);
                    } else {
                        res.json(ressourcentyp);
                    }
                }
            );
        }
    }); 
};

exports.list = function(req, res){
    RessourcenTyp.find().exec(function(err, ressourcentypen) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            res.send(ressourcentypen);
        }
    });
};

exports.get = function(req, res){
    RessourcenTyp.find({_id: req.query['id']}).exec(function(err, ressourcentyp) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            res.json({object : ressourcentyp});
        }
    });
};