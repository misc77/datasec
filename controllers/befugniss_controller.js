/*
 * Initation
 */
var Model = require('../models/models.js');
var Musterrolle = Model.Musterrolle;
var Befugniss = Model.Befugniss;
var Mitarbeiter = Model.Mitarbeiter;

var self = module.exports = {
    create : function (req, res){
        console.log('create befugniss...');
       var befugniss = new Befugniss();
        befugniss.set('mitarbeiter',      req.body.mitarbeiter);
        befugniss.set('display',          req.body.mitarbeiter.mitarbeiternr + '-' + req.body.mitarbeiter.nachname + ' ' + req.body.mitarbeiter.vorname + ' (' + req.body.mitarbeiter.standort.bezeichnung + ')');
        befugniss.set('bezeichnung',      req.body.bezeichnung);
        befugniss.set('aufgabe',          req.body.aufgabe);
        befugniss.set('tresor_zuo',       req.body.tresor_zuo);
        befugniss.set('raum_zuo',         req.body.raum_zuo);
        befugniss.set('ressource_zuo',    req.body.ressource_zuo);
        befugniss.set('hardware_zuo',     req.body.hardware_zuo);
        befugniss.set('is_init',          false);
        if (req.body.fahrzeugliste !== undefined & req.body.fahrzeugliste !== null) {
            befugniss.fahrzeugliste = [];
            if (req.body.fahrzeugliste.length > 0){
                for( var i = req.body.fahrzeugliste.length-1; i >= 0; --i){
                    if (req.body.fahrzeugliste[i] !== null & req.body.fahrzeugliste[i] !== undefined){
                        befugniss.fahrzeugliste.push(req.body.fahrzeugliste[i]);
                    }
                }
            }
        }
        befugniss.set('byod',             req.body.byod);
        befugniss.set('fernzugriff',      req.body.fernzugriff);
        befugniss.set('aktiv',            req.body.aktiv);

        befugniss.save(function(err){
            if(err){
                console.log('err: ' + err);
            } else {
                console.log('saved befugniss: ' + JSON.stringify(befugniss));
                Mitarbeiter.findOne({_id: req.body.mitarbeiter}).exec(function(err, mitarbeiter){
                    if(err){
                        console.log(err.getErrorMessage(err));
                    } else {
                        mitarbeiter.befugniss_init = false;
                        mitarbeiter.save(
                            function(err){
                                if(err){
                                    console.log('err: ' + err);
                                } else {
                                    console.log('mitarbeiter updated!');
                                    res.json(befugniss);
                                }
                            });
                    }
                });
            }
        });
    },

    delete : function (req, res){
        Musterrolle.findOneAndRemove({_id: req.body._id}, function(err){
            if (err){
                console.log('err: ' + err);
            } else {
                res.json({msg: 'Objekt gelöscht'});
            }
        });
    },

    save : function (req, res){
        if (req.body.is_init){
            self.create(req, res);
        } else {
            Befugniss.findOne({_id: req.body._id}).exec(function(err, befugniss) {
                if (err) {
                    return res.status(400).send({
                        msg: err.getErrorMessage(err)
                    });
                } else {
                    if (req.body.mitarbeiter !== undefined & req.body.mitarbeiter !== null) {
                        befugniss.mitarbeiter = req.body.mitarbeiter;
                        befugniss.display = req.body.mitarbeiter.mitarbeiternr + '-' + req.body.mitarbeiter.nachname + ' ' + req.body.mitarbeiter.vorname + ' (' + req.body.mitarbeiter.standort.bezeichnung + ')';
                    }
                    if (req.body.tresor_zuo !== undefined & req.body.tresor_zuo !== null) {
                        befugniss.tresor_zuo = req.body.tresor_zuo;
                    }
                    if (req.body.raum_zuo !== undefined & req.body.raum_zuo !== null) {
                        befugniss.raum_zuo = req.body.raum_zuo;
                    }
                    if (req.body.fahrzeugliste !== undefined & req.body.fahrzeugliste !== null) {
                        befugniss.fahrzeugliste = req.body.fahrzeugliste;
                    }
                    if (req.body.ressource_zuo !== undefined & req.body.ressource_zuo !== null) {
                        befugniss.ressource_zuo = req.body.ressource_zuo;
                    }
                    if (req.body.hardware_zuo !== undefined & req.body.hardware_zuo !== null) {
                        befugniss.hardware_zuo = req.body.hardware_zuo;
                    }
                    if (req.body.byod === undefined | req.body.byod === null ){
                        befugniss.byod = false;
                    } else {
                        befugniss.byod = true;
                    }
                    if (req.body.fernzugriff === undefined | req.body.fernzugriff === null ){
                        befugniss.fernzugriff = false;
                    } else {
                        befugniss.fernzugriff = true;
                    }
                    befugniss.save(
                        function(err){
                            if(err){
                                console.log('err: ' + err);
                            } else {
                                res.json(befugniss);
                            }
                        }
                    );
                }
            }); 
        }
    },

    list : function(req, res){
        Mitarbeiter.find()
                .populate('status')
                .populate('rolle')
                .populate('beschaeftigung')
                .populate('aufgabe')
                .populate('urlaubsvertretung')
                .populate('standort')
                .exec(function(err, mitarbeiter) {
            if (err) {
                console.log('err: ' + err);
                return res.status(400).send({
                    msg: err.getErrorMessage(err)
                });
            } else {
                res.send(mitarbeiter);
            }
        });
    },

    get_new_obj : function(req, res){
        console.log('in get_new_obj ' + req.query['id']);
        // load mitarbeiter object
        Mitarbeiter.findOne({_id: req.query['id']})
            .populate('rolle')
            .populate('beschaeftigung')
            .populate('aufgabe')
            .populate('standort')
            .exec(function(err, mitarbeiter) {
                    if (err) {
                        console.log('err: ' + err);
                    } else {
                        // select musterrolle
                        if (mitarbeiter !== undefined & mitarbeiter !== null){
                            Musterrolle.find({   'aufgabe':        mitarbeiter.aufgabe
                                               , 'beschaeftigung': mitarbeiter.beschaeftigung })
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
                                } else {
                                    console.log('musterrolle: ' + JSON.stringify(musterrolle));
                                    // init befugniss
                                    var befugniss = new Befugniss();
                                    befugniss.set('mitarbeiter',        mitarbeiter);
                                    befugniss.set('is_init',            true);
                                    if (musterrolle !== undefined && musterrolle !== null){
                                        console.log('init with musterrolle...');
                                        // init befugniss with musterrolle
                                        fuhrpark = [];
                                        for (i = 0; i < musterrolle[0].fahrzeugliste.length; i++){
                                            fuhrpark.push(musterrolle[0].fahrzeugliste[i].fahrzeug);
                                        }
                                        befugniss.set('tresor_zuo',         musterrolle[0].tresor_zuo);
                                        befugniss.set('raum_zuo',           musterrolle[0].raum_zuo);
                                        befugniss.set('fahrzeugliste',      fuhrpark);
                                        befugniss.set('ressource_zuo',      musterrolle[0].ressource_zuo);
                                        befugniss.set('hardware_zuo',       musterrolle[0].hardware_zuo);
                                        befugniss.set('byod',               musterrolle[0].byod);
                                        befugniss.set('fernzugriff',        musterrolle[0].fernzugriff);
                                    } else {
                                        console.log('init with null');
                                        // if no musterrolle has been found
                                        befugniss.set('tresor_zuo',       { tresor: null, zutrittsmittel: null});
                                        befugniss.set('raum_zuo',         { raum: null, zutrittsmittel: null });
                                        befugniss.set('ressource_zuo',    { ressource: null, rechte: null });
                                        befugniss.set('hardware_zuo',     { hardware: null, rechte: null });
                                        befugniss.set('fahrzeugliste',    { fahrzeug: null } );
                                        befugniss.set('byod',             false);
                                        befugniss.set('fernzugriff',      false);
                                    }
                                    console.log('object: ' + JSON.stringify((befugniss)));
                                    res.json({object : befugniss});     
                                }
                            });
                        }
                    }
            });
    },

    get : function(req, res){
        console.log('in get: ' + req.query['id']);
        Befugniss.find({mitarbeiter: req.query['id']})
                .populate('mitarbeiter')
                .populate('tresor_zuo.tresor')
                .populate('tresor_zuo.zutrittsmittel')
                .populate('raum_zuo.raum')
                .populate('raum_zuo.zutrittsmittel')
                .populate('fahrzeugliste.fahrzeug')
                .populate('ressource_zuo.ressource')
                .populate('ressource_zuo.rechte')
                .populate('hardware_zuo.hardware')
                .populate('hardware_zuo.rechte')
                .exec(function(err, befugniss) {
            if (err) {
                console.log('err: ' + err);
                return res.status(400).send({
                    msg: err.getErrorMessage(err)
                });
            } else {
                if (befugniss.mitarbeiter !== undefined) {
                    console.log('object raw: ' + (befugniss !== null));
                    console.log('object: ' + JSON.stringify(befugniss.mitarbeiter));
                    res.json({object : befugniss});
                } else {
                    console.log('calling get_new_obj');
                    self.get_new_obj(req, res);
                }
            }
        });
    }
};