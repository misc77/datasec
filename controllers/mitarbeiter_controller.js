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
   var mitarbeiter = new Mitarbeiter();
   mitarbeiter.set('mitarbeiter_nr', req.body.mitarbeiter_nr);
   mitarbeiter.set('vorname', req.body.vorname);
   mitarbeiter.set('nachname', req.body.nachname);
   mitarbeiter.set('geburtsdatum', req.body.geburtsdatum);
   mitarbeiter.set('standort', req.body.standort);
   mitarbeiter.set('aufgabe', req.body.aufgabe);
   mitarbeiter.set('status', req.body.status);
   mitarbeiter.set('rolle', req.body.rolle);
   if (req.body.urlaubsvertretung !== undefined | req.body.urlaubsvertretung !== null) {
        mitarbeiter.set('urlaubsvertretung', req.body.urlaubsvertretung);
        mitarbeiter.set('vertretungSeit', req.body.vertretungseit);
        if (req.body.vertretungbis !== undefined | req.body.vertretungbis !== null) {
             mitarbeiter.set('vertretungBis', req.body.vertretungbis);
        }
   }
   var protokoll = new Protokoll();
   protokoll.set('eintrag', 'Mitarbeiter ' + req.body.mitarbeiter_nr + ' angelegt');
   protokoll.set('datum', Date.now());
   protokoll.set('user', req.body.user);
   protokoll.save();
   mitarbeiter.add('protokoll', protokoll._id);
   mitarbeiter.save();
};


