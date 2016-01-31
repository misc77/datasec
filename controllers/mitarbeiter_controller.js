/*
 * Initation
 */
var Model = require('../models/models.js');
Mitarbeiter = Model.Mitarbeiter;
Protokoll   = Model.Protokoll;

/*
 * Create
 */
exports.create = function(req, res){
   console.log('in create');  
   console.log('data: ' + req.body);
   var mitarbeiter = new Mitarbeiter();
   mitarbeiter.set('mitarbeiternr', req.body.mitarbeiternr);
   mitarbeiter.set('vorname', req.body.vorname);
   mitarbeiter.set('nachname', req.body.nachname);
   mitarbeiter.set('geburtsdatum', req.body.geburtsdatum);
   mitarbeiter.set('standort', req.body.standort);
   mitarbeiter.set('aufgabe', req.body.aufgabe);
   mitarbeiter.set('status', req.body.status);
   mitarbeiter.set('rolle', req.body.rolle);
   mitarbeiter.set('beschaeftigung', req.body.beschaeftigung);
   mitarbeiter.set('statusSeit', req.body.statusSeit);
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
};

exports.delete = function (req, res){
    Mitarbeiter.findOneAndRemove({_id: req.body._id}, function(err){
        if (err){
            console.log('err: ' + err);
        } else {
            res.json({msg: 'Objekt gelöscht'});
        }
    });
};

exports.save = function (req, res){
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
                mitarbeiter.geburtsdatum = req.body.geburtsdatum;
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
                mitarbeiter.vertretungSeit = req.body.vertretungSeit;
            }
            if (req.body.vertretungBis !== null & req.body.vertretungBis !== undefined ){
                mitarbeiter.vertretungBis = req.body.vertretungBis;
            }
            
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
};

exports.list = function(req, res){
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
};

exports.get = function(req, res){
    Mitarbeiter.find({_id: req.query['id']})
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
            res.json({object : mitarbeiter});
        }
    });
};

