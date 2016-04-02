/*
 * Initation
 */
var Model = require('../models/models.js');
var Musterrolle = Model.Musterrolle;

exports.create = function (req, res){
   var musterrolle = new Musterrolle();
    musterrolle.set('aufgabe', req.body.aufgabe);
    for ( var i in req.body.tresor_zuo ) {
        var item = req.body.tresor_zuo[i];
        var obj = { tresor : item['tresor'], zutrittsmittel : item['zutrittsmittel']};
        musterrolle.tresor_zuo.push(obj);
    }
    musterrolle.set('aktiv', req.body.aktiv);
    
    musterrolle.save(function(err){
        if(err){
            console.log('err: ' + err);
        } else {
            res.json(musterrolle);
        }
    });
};

exports.delete = function (req, res){
    Musterrolle.findOneAndRemove({_id: req.body._id}, function(err){
        if (err){
            console.log('err: ' + err);
        } else {
            res.json({msg: 'Objekt gelöscht'});
        }
    });
};

exports.save = function (req, res){
    Musterrolle.findOne({_id: req.body._id}).exec(function(err, musterrolle) {
        if (err) {
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            if (req.body.bezeichnung !== undefined & req.body.bezeichnung !== null) {
                musterrolle.bezeichnung = req.body.bezeichnung;
            }
            if (req.body.beschreibung !== undefined & req.body.beschreibung !== null) {
                musterrolle.beschreibung = req.body.beschreibung;
            }
            if (req.body.aktiv === undefined | req.body.aktiv === null ){
                musterrolle.aktiv = false;
            } else {
                musterrolle.aktiv = true;
            }
            musterrolle.save(
                function(err){
                    if(err){
                        console.log('err: ' + err);
                    } else {
                        res.json(musterrolle);
                    }
                }
            );
        }
    }); 
};

exports.list = function(req, res){
    Musterrolle.find().exec(function(err, musterrolle) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            res.send(musterrolle);
        }
    });
};

exports.get = function(req, res){
    Musterrolle.find({_id: req.query['id']}).exec(function(err, musterrolle) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            res.json({object : musterrolle});
        }
    });
};