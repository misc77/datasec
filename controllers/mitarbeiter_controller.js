/*
 * Initation
 */
var Model = require('../models/models.js');
Mitarbeiter = Model.Mitarbeiter;
Musterrolle = Model.Musterrolle;
Befugniss = Model.Befugniss;
Protokoll   = Model.Protokoll;
var ObjectID = require('mongodb').ObjectID;

/*
 * Create
 */
var self = module.exports = { 
    create : function(req , res){
        console.log('in create');  
        console.log('data: ' + req.body);
        var mitarbeiter = new Mitarbeiter();
        mitarbeiter.set('mitarbeiternr', req.body.mitarbeiternr);
        mitarbeiter.set('display', req.body.mitarbeiternr + '-' + req.body.nachname + ' ' + req.body.vorname + ' (' + req.body.standort.bezeichnung + ')');
        mitarbeiter.set('vorname', req.body.vorname);
        mitarbeiter.set('nachname', req.body.nachname);
        mitarbeiter.set('geburtsdatum', req.body.geburtsdatum);
        mitarbeiter.set('geburtsort', req.body.geburtsort);
        mitarbeiter.set('standort', req.body.standort);
        mitarbeiter.set('aufgabe', req.body.aufgabe);
        mitarbeiter.set('status', req.body.status);
        mitarbeiter.set('rolle', req.body.rolle);
        mitarbeiter.set('beschaeftigung', req.body.beschaeftigung);
        mitarbeiter.set('statusSeit', req.body.statusSeit);
        mitarbeiter.set('befugniss_init', true);
        if (req.body.berechtigung !== undefined) {
             mitarbeiter.set('berechtigung', req.body.berechtigung);
        } else {
            mitarbeiter.set('berechtigung', self.init_rights(req.body.aufgabe._id, req.body.beschaeftigung._id));
        }
        mitarbeiter.set('string', req.body.nachname + ' ' + req.body.vorname + ' ( ' + req.body.mitarbeiternr + ')');
        if (req.body.urlaubsvertretung !== undefined | req.body.urlaubsvertretung !== null) {
             mitarbeiter.set('urlaubsvertretung', req.body.urlaubsvertretung);
             mitarbeiter.set('vertretungSeit', req.body.vertretungSeit);
             if (req.body.vertretungBis !== undefined | req.body.vertretungBis !== null) {
                  mitarbeiter.set('vertretungBis', req.body.vertretungBis);
             }
        }
    //   var protokoll = new Protokoll();
    //   protokoll.set('eintrag', 'Mitarbeiter ' + req.body.mitarbeiter_nr + ' angelegt');
    //   protokoll.set('datum', Date.now());
    //   protokoll.set('user', req.body.user);
    //   protokoll.save();
    //   mitarbeiter.add('protokoll', protokoll._id);
       mitarbeiter.save(function(err){
            if(err){
                console.log('err: ' + err);
            } else {

                res.json(mitarbeiter);
            }
        });
    },

    delete : function (req, res){
        Mitarbeiter.findOneAndRemove({_id: req.body._id}, function(err){
            if (err){
                console.log('err: ' + err);
            } else {
                res.json({msg: 'Objekt gelöscht'});
            }
        });
    },

    save : function (req, res){
        Mitarbeiter.findOne({_id: req.body._id}).exec(function(err, mitarbeiter) {
            if (err) {
                return res.status(400).send({
                    msg: err.getErrorMessage(err)
                });
            } else {
                if (req.body.mitarbeiternr !== undefined & req.body.mitarbeiternr !== null) {
                    mitarbeiter.mitarbeiternr = req.body.mitarbeiternr;
                }
                if (req.body.vorname !== undefined & req.body.vorname !== null) {
                    mitarbeiter.vorname = req.body.vorname;
                }
                if (req.body.nachname !== undefined & req.body.nachname !== null) {
                    mitarbeiter.nachname = req.body.nachname;
                    mitarbeiter.string = req.body.nachname + ' ' + req.body.vorname + ' ( ' + req.body.mitarbeiternr + ' ) ';
                }
                if (req.body.geburtsdatum !== undefined | req.body.geburtsdatum !== null ){
                    mitarbeiter.geburtsdatum = new Date(req.body.geburtsdatum);
                } 
                if (req.body.geburtsort !== undefined | req.body.geburtsort !== null ){
                    mitarbeiter.geburtsort = req.body.geburtsort;
                } 
                if (req.body.standort !== null & req.body.standort !== undefined ){
                    mitarbeiter.standort = req.body.standort;
                }
                if (req.body.aufgabe !== null & req.body.aufgabe !== undefined ){
                    mitarbeiter.aufgabe = req.body.aufgabe;
                }
                if (req.body.beschaeftigung !== null & req.body.beschaeftigung !== undefined ){
                    mitarbeiter.beschaeftigung = req.body.beschaeftigung;
                }
                if (req.body.status !== null & req.body.status !== undefined ){
                    mitarbeiter.status = req.body.status;
                }
                if (req.body.rolle !== null & req.body.rolle !== undefined ){
                    mitarbeiter.rolle = req.body.rolle;
                }
                if (req.body.urlaubsvertretung !== null & req.body.urlaubsvertretung !== undefined ){
                    mitarbeiter.urlaubsvertretung = req.body.urlaubsvertretung;
                }
                if (req.body.vertretungSeit !== null & req.body.vertretungSeit !== undefined ){
                    mitarbeiter.vertretungSeit = new Date(req.body.vertretungSeit);
                }
                if (req.body.vertretungBis !== null & req.body.vertretungBis !== undefined ){
                    mitarbeiter.vertretungBis = new Date(req.body.vertretungBis);
                }
                if(req.body.befugniss_init !== null & req.body.befugniss_init !== undefined & req.body.befugniss_init === false){
                    mitarbeiter.befugniss_init = false;
                }
                if(req.body.berechtigung !== null & req.body.berechtigung !== undefined ){
                    mitarbeiter.berechtigung = req.body.berechtigung;
                    mitarbeiter.befugniss_init = false;
                }
                mitarbeiter.display = req.body.mitarbeiternr + ' - ' + req.body.nachname + ' ' + req.body.vorname + ' (' + req.body.standort.bezeichnung + ')';
    //            var protokoll = new Protokoll();
    //            protokoll.set('eintrag', 'Mitarbeiter ' + req.body.mitarbeiter_nr + ' geändert');
    //            protokoll.set('datum', Date.now());
    //            protokoll.set('user', req.body.user);
    //            protokoll.save();
    //            mitarbeiter.add('protokoll', protokoll._id);
                mitarbeiter.save(
                    function(err){
                        if(err){
                            console.log('err: ' + err);
                        } else {
                            res.json(mitarbeiter);
                        }
                    }
                );
            }
        }); 
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

    get : function(req, res){
        Mitarbeiter.find({_id: req.query['id']})
                .populate('status')
                .populate('rolle')
                .populate('beschaeftigung')
                .populate('aufgabe')
                .populate('urlaubsvertretung')
                .populate('standort')
                .populate('berechtigung.tresor_zuo.tresor')
                .populate('berechtigung.tresor_zuo.zutrittsmittel')
                .populate('berechtigung.raum_zuo.raum')
                .populate('berechtigung.raum_zuo.zutrittsmittel')
                .populate('berechtigung.fahrzeugliste.fahrzeug')
                .populate('berechtigung.ressource_zuo.ressource')
                .populate('berechtigung.ressource_zuo.rechte')
                .populate('berechtigung.hardware_zuo.hardware')
                .populate('berechtigung.hardware_zuo.rechte')
                .exec(function(err, mitarbeiter) {
            if (err) {
                console.log('err: ' + err);
                return res.status(400).send({
                    msg: err.message
                });
            } else {
                res.json({object : mitarbeiter});
            }
        });
    },

    get_init_rights : function(req, res){
        console.log('in get init_rights ' + req.query['aufgabe_id']);
        var aufgabe_id = req.query['aufgabe_id'];
        var beschaeftigung_id = req.query['beschaeftigung_id'];
        var befugniss = new Befugniss();
        
        // select musterrolle
        Musterrolle.findOne({   'aufgabe':        new ObjectID(aufgabe_id)
                              , 'beschaeftigung': new ObjectID(beschaeftigung_id) })
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
                 befugniss.set('is_init',            true);
                 // init befugniss
                 if (musterrolle !== undefined && musterrolle !== null){
                    console.log('init with musterrolle...');
                    // init befugniss with musterrolle
                    fuhrpark = [];
                    if (musterrolle.fahrzeugliste !== undefined){
                        for (i = 0; i < musterrolle.fahrzeugliste.length; i++){
                            fuhrpark.push(musterrolle.fahrzeugliste[i].fahrzeug);
                        }
                    }
                    befugniss.set('tresor_zuo',         musterrolle.tresor_zuo);
                    befugniss.set('raum_zuo',           musterrolle.raum_zuo);
                    befugniss.set('fahrzeugliste',      fuhrpark);
                    befugniss.set('ressource_zuo',      musterrolle.ressource_zuo);
                    befugniss.set('hardware_zuo',       musterrolle.hardware_zuo);
                    befugniss.set('byod',               musterrolle.byod);
                    befugniss.set('fernzugriff',        musterrolle.fernzugriff);
                 } else {
                    console.log('init with null');
                    // if no musterrolle has been found
                    befugniss.set('byod',             false);
                    befugniss.set('fernzugriff',      false);
                }

                console.log('ir object: ' + JSON.stringify((befugniss))); 
                res.json({object : befugniss}); 
             }
         }); 
                       
    },
     
    init_rights : function(aufgabe_id, beschaeftigung_id){
        console.log('in init_rights ' + aufgabe_id + ', ' + beschaeftigung_id);

        // select musterrolle
        Musterrolle.findOne({   'aufgabe':        new ObjectID(aufgabe_id)
                              , 'beschaeftigung': new ObjectID(beschaeftigung_id) })
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
                 var befugniss = new Befugniss();
                 befugniss.set('is_init',            true);
                 // init befugniss
                 if (musterrolle !== undefined && musterrolle !== null){
                    console.log('init with musterrolle...');
                    // init befugniss with musterrolle
                    fuhrpark = [];
                    if (musterrolle.fahrzeugliste !== undefined){
                        for (i = 0; i < musterrolle.fahrzeugliste.length; i++){
                            fuhrpark.push(musterrolle.fahrzeugliste[i].fahrzeug);
                        }
                    }
                    befugniss.set('tresor_zuo',         musterrolle.tresor_zuo);
                    befugniss.set('raum_zuo',           musterrolle.raum_zuo);
                    befugniss.set('fahrzeugliste',      fuhrpark);
                    befugniss.set('ressource_zuo',      musterrolle.ressource_zuo);
                    befugniss.set('hardware_zuo',       musterrolle.hardware_zuo);
                    befugniss.set('byod',               musterrolle.byod);
                    befugniss.set('fernzugriff',        musterrolle.fernzugriff);
                 } else {
                    console.log('init with null');
                    // if no musterrolle has been found
                    befugniss.set('byod',             false);
                    befugniss.set('fernzugriff',      false);
                }

                console.log('ir object: ' + JSON.stringify((befugniss)));
                return befugniss;     
             }
         });     
    },

    get_new_obj : function(req, res){
        console.log('in get_new_obj ');
        var mitarbeiter = new Mitarbeiter();
        mitarbeiter.status = undefined;
        mitarbeiter.rolle = undefined;
        mitarbeiter.beschaeftigung = undefined;
        mitarbeiter.aufgabe = undefined;
        mitarbeiter.standort = undefined;
        mitarbeiter.berechtigung = undefined;

        res.json({object : mitarbeiter});
    }
};

