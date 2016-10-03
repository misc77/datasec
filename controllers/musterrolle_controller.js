/*
 * Initation
 */
var Model = require('../models/models.js');
var Musterrolle = Model.Musterrolle;
var Aufgabe = Model.Aufgabe;

exports.create = function (req, res){
   var musterrolle = new Musterrolle();
    musterrolle.set('bezeichnung',      req.body.bezeichnung);
    musterrolle.set('display',          req.body.bezeichnung);
    musterrolle.set('aufgabe',          req.body.aufgabe);
    musterrolle.set('tresor_zuo',       req.body.tresor_zuo);
    musterrolle.set('raum_zuo',         req.body.raum_zuo);
    musterrolle.set('ressource_zuo',    req.body.ressource_zuo);
    musterrolle.set('hardware_zuo',     req.body.hardware_zuo);
    musterrolle.set('fahrzeugliste',    req.body.fahrzeugliste);
    musterrolle.set('byod',             req.body.byod);
    musterrolle.set('fernzugriff',      req.body.fernzugriff);
    musterrolle.set('aktiv',            req.body.aktiv);
    
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

exports.exist = function (req, res) {
    var aufgabe_id = req.query['aufgabe_id'];
    var beschaeftigung_id = req.query['beschaeftigung_id'];

    Musterrolle.findOne({ 'aufgabe' : new ObjectId(aufgabe_id), 
                          'beschaeftigung' : new ObjectId(beschaeftigung_id) }
                       ).exec( function(err, musterrolle) {
                           if (err) {
                               console.log('error during query for Musterrolle! ' + err);
                           } 
                       });
    res.json({result: false});
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
                musterrolle.display = req.body.bezeichnung;
            }
            if (req.body.aufgabe !== undefined & req.body.aufgabe !== null){
                musterrolle.aufgabe = req.body.aufgabe;
            }
            if (req.body.beschaeftigung !== undefined & req.body.beschaeftigung !== null) {
                musterrolle.beschaeftigung = req.body.beschaeftigung;
            }
            if (req.body.tresor_zuo !== undefined & req.body.tresor_zuo !== null) {
                musterrolle.tresor_zuo = req.body.tresor_zuo;
            }
            if (req.body.raum_zuo !== undefined & req.body.raum_zuo !== null) {
                musterrolle.raum_zuo = req.body.raum_zuo;
            }
            if (req.body.fahrzeugliste !== undefined & req.body.fahrzeugliste !== null) {
                musterrolle.fahrzeugliste = [];
                if (req.body.fahrzeugliste.length > 0){
                    for( var i = req.body.fahrzeugliste.length-1; i >= 0; --i){
                        if (req.body.fahrzeugliste[i] !== null & req.body.fahrzeugliste[i] !== undefined){
                            musterrolle.fahrzeugliste.push(req.body.fahrzeugliste[i]);
                        }
                    }
                }
            }
            if (req.body.ressource_zuo !== undefined & req.body.ressource_zuo !== null) {
                musterrolle.ressource_zuo = req.body.ressource_zuo;
            }
            if (req.body.hardware_zuo !== undefined & req.body.hardware_zuo !== null) {
                musterrolle.hardware_zuo = req.body.hardware_zuo;
            }
            if (req.body.aktiv === undefined | req.body.aktiv === null ){
                musterrolle.aktiv = false;
            } else {
                musterrolle.aktiv = true;
            }
            if (req.body.byod === undefined | req.body.byod === null ){
                musterrolle.byod = false;
            } else {
                musterrolle.byod = true;
            }
            if (req.body.fernzugriff === undefined | req.body.fernzugriff === null ){
                musterrolle.fernzugriff = false;
            } else {
                musterrolle.fernzugriff = true;
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

exports.get_new_obj = function(req, res){
    var musterrolle = new Musterrolle();
    musterrolle.set('bezeichnung',      'Neu');
    musterrolle.set('aufgabe',          new Aufgabe());
    musterrolle.set('tresor_zuo',       { tresor: null, zutrittsmittel: null});
    musterrolle.set('raum_zuo',         { raum: null, zutrittsmittel: null });
    musterrolle.set('ressource_zuo',    { ressource: null, rechte: null });
    musterrolle.set('hardware_zuo',     { hardware: null, rechte: null });
    musterrolle.set('fahrzeugliste',    { fahrzeug: null } );
    musterrolle.set('byod',             false);
    musterrolle.set('fernzugriff',      false);
    musterrolle.set('aktiv',            true);
    
    console.log('object: ' + JSON.stringify((musterrolle)));
    res.json({object : musterrolle});
};

exports.get = function(req, res){
    Musterrolle.find({_id: req.query['id']})
            .populate('aufgabe' )
            .populate('beschaeftigung')
            .populate('tresor_zuo.tresor')
            .populate('tresor_zuo.zutrittsmittel')
            .populate('raum_zuo.raum')
            .populate('raum_zuo.zutrittsmittel')
            .populate('fahrzeugliste.fahrzeug')
            .populate('ressource_zuo.ressource')
            .populate('ressource_zuo.rechte')
            .populate('hardware_zuo.hardware')
            .populate('hardware_zuo.rechte')
            .exec(function(err, musterrolle) {
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