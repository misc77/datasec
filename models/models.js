/* 
 * Schema für Anwendung
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/DataSec');
var Schema = mongoose.Schema;

/* Aufgabe */
var aufgabeSchema = new Schema({
    bezeichnung:    String,
    beschreibung:   String,
    aktiv:          Boolean
});
var Aufgabe = mongoose.model("aufgabe", aufgabeSchema);

/* Berechtigung */
var berechtigungSchema = new Schema({
    bezeichnung:    String,
    beschreibung:   String
});
var Berechtigung = mongoose.model("berechtigung", berechtigungSchema);

/* Datenschutzerklärungsdokumente */
var dokumentSchema = new Schema({
    bezeichnung:    String,
    beschreibung:   String,
    template:       String,  //link
    sensibel:       Boolean,
    unterzeichnet:  Date
});
var Dokument = mongoose.model("dokument", dokumentSchema);

/* Daten */
var datenSchema = new Schema({
    bezeichnung:    String,
    sensibel:       Boolean
});
var Daten = mongoose.model("daten", datenSchema);

/* Fahrzeug */
var fahrzeugSchema = new Schema({
    kennzeichen:    String,
    beschreibung:   String,
    standort:       {type: Schema.Types.ObjectId, ref: 'standort'},
    aktiv:          Boolean,
    navigation:     Boolean,
    reset:          Boolean,
    protokoll:      [{ user:      {type: Schema.Types.ObjectId, ref: 'user'},
                       eintrag:   String,
                       datum:     Date }]
});
var Fahrzeug = mongoose.model("fahrzeug", fahrzeugSchema);

/* IT-Hardware */
var hardwareSchema = new Schema({
    bezeichnung:        String,
    inventarNr:         String,
    aktiv:              Boolean,
    deaktiviertAm:      Date,
    quittierung:        Boolean,
    verwendungszweck:   String,
    mobiledevmgmt:      Boolean,
    protokoll:          [{ user:      {type: Schema.Types.ObjectId, ref: 'user'},
                           eintrag:   String,
                           datum:     Date }]
});
var Hardware = mongoose.model("hardware", hardwareSchema);

/* IT-Ressourcen */
var ressourceSchema = new Schema({
    bezeichnung:   String,
    beschreibung:  String,
    daten:         [{type: Schema.Types.ObjectId, ref: 'daten'}]    
});
var Ressource = mongoose.model("ressource", ressourceSchema);

/* Mitarbeiter */
var mitarbeiterSchema = new Schema({
    mitarbeiter_nr:     String,
    vorname:            String,
    nachname:           String,
    geburtsdatum:       Date,
    standort:           [{type: Schema.Types.ObjectId, ref: 'standort'}],
    aufgabe:            {type: Schema.Types.ObjectId, ref: 'aufgabe'},
    status:             {type: Schema.Types.ObjectId, ref: 'status'},
    rolle:              {type: Schema.Types.ObjectId, ref: 'rolle'},
    urlaubsvertretung:  {type: Schema.Types.ObjectId, ref: 'mitarbeiter'},
    vertretungSeit:     Date,
    vertretungBis:      Date,
    protokoll:          [ { user:      {type: Schema.Types.ObjectId, ref: 'user'},
                            eintrag:   String,
                            datum:     Date }]
});
var Mitarbeiter = mongoose.model("mitarbeiter", mitarbeiterSchema);

/* Papierdokument */
var papierdokumentSchema = new Schema({
    bezeichnung:    String,
    beschreibung:   String,
    aktiv:          Boolean,
    daten:          [{type: Schema.Types.ObjectId, ref: 'daten'}],
    dokumente:      [{type: Schema.Types.ObjectId, ref: 'dokument'}],
    protokoll:      [{ user:      {type: Schema.Types.ObjectId, ref: 'user'},
                       eintrag:   String,
                       datum:     Date }]
});
var Papierdokument = mongoose.model("papierdokument", papierdokumentSchema);

/* Rolle */
var rolleSchema = new Schema({
    bezeichnung:    String,
    beschreibung:   String,
    aktiv:          Boolean
});
var Rolle = mongoose.model("rolle", rolleSchema);

/* Tresor */
var tresorSchema = new Schema({
    bezeichnung:    String,
    beschreibung:   String,
    daten:          [{type: Schema.Types.ObjectId, ref: 'daten'}]
});
var Tresor = mongoose.model("tresor", tresorSchema);

/* Standort */
var standortSchema = new Schema({
   bezeichnung:     String,
   land:            String,
   hauptstandort:   Boolean,
   gruendung:       Date,
   schliessung:     Date
});
standortSchema.statics.findByLand = function(land, cb){
    return this.find({land: new RegExp(land, 'i')}, cb);
};
standortSchema.statics.findByName = function(name, cb){
    return this.find({bezeichnung: new RegExp(name, 'i')}, cb);
};
var Standort = mongoose.model("standort", standortSchema);

/* Status */
var statusSchema = new Schema({
   bezeichnung:   String, 
   beschreibung:  String,
   begin:         Date,
   ende:          Date
});
var Status = mongoose.model("status", statusSchema);

/* Zutrittsmittel */
var zutrittsmittelSchema = new Schema({
    bezeichnung:  String,
    beschreibung: String,
    aktiv:        Boolean,
    ausgabe:      Date,
    rueckgabe:    Date,
    status:       String,
    protokoll:    [{ user:      {type: Schema.Types.ObjectId, ref: 'User'},
                     eintrag:   String,
                     datum:     Date }]
});
var Zutrittsmittel = mongoose.model("zutrittsmittel", zutrittsmittelSchema);

/* Raum */
var raumSchema = new Schema({
   bezeichnung:    String,
   art:            String,
   beschraenkt:    Boolean,
   daten:          [{type: Schema.Types.ObjectId, ref: 'daten'}],
   zutrittsmittel: [{type: Schema.Types.ObjectId, ref: 'zutrittsmittel'}]
});
var Raum = mongoose.model("raum", raumSchema);

/* Aufgaben Befugnisse */
/** Template für Befugnisse **/
var aufgabenBefugnissSchema = new Schema({
    aufgabe:     {type: Schema.Types.ObjectId, ref: 'aufgabe'},
    tresor:      [{type: Schema.Types.ObjectId, ref: 'tresor'}],  
    raum:        [{type: Schema.Types.ObjectId, ref: 'raum'}],
    fahrzeug:    [{type: Schema.Types.ObjectId, ref: 'fahrzeug'}],
    papierdokumente: [{type: Schema.Types.ObjectId, ref: 'papierdokument'}],
    hardware:    [{type: Schema.Types.ObjectId, ref: 'hardware'}],
    byod:        Boolean,
    fernzugriff: Boolean,
    berechtigung: [{type: Schema.Types.ObjectId, ref: 'berechtigung'}],
    ressource:   [{type: Schema.Types.ObjectId, ref: 'ressource'}]
});
var Aufgabenbefugniss = mongoose.model("aufgabenbefugniss", aufgabenBefugnissSchema);

/* Befugniss */
/** Haupt-Collection zur Zuordnung der Befugnisse pro Mitarbeiter **/
var befugnissSchema = new Schema({
    mitarbeiter:     {type: Schema.Types.ObjectId, ref: 'mitarbeiter'},
    dokumente:       [{type: Schema.Types.ObjectId, ref: 'dokument'}],
    raum:            [{type: Schema.Types.ObjectId, ref: 'raum'}, String, Date],
    fahrzeug:        [{type: Schema.Types.ObjectId, ref: 'fahrzeug'}],
    papierdokumente: [{type: Schema.Types.ObjectId, ref: 'papierdokument'}, {type: Schema.Types.ObjectId, ref: 'berechtigung'}],
    hardware:        [{type: Schema.Types.ObjectId, ref: 'hardware'}],
    byod:            Boolean,
    fernzugriff:     Boolean,
    berechtigung:    [{type: Schema.Types.ObjectId, ref: 'berechtigung'}],
    ressource:       [{type: Schema.Types.ObjectId, ref: 'ressource'}],
    protokoll:       [{ user:      {type: Schema.Types.ObjectId, ref: 'user'},
                        eintrag:   String,
                        datum:     Date }]
});
var Befugniss = mongoose.model("befugniss", befugnissSchema);

/* Log */
var logSchema = new Schema({
    eintrag:    String,
    user:       {type: Schema.Types.ObjectId, ref: 'user'},
    datum:      Date
});
var Log = mongoose.model("log", logSchema);

/* User */
var userSchema = new Schema({
    name:           { type: String, unique: true, index: true },
    pwd:             String,
    email:           String,
    locked:          Boolean,
    mitarbeiter:     Boolean,
    raum:            Boolean,
    dokument:        Boolean,
    fuhrpark:        Boolean,
    papierdokumente: Boolean,
    hardware:        Boolean,
    byod:            Boolean,
    fernzugriff:     Boolean,
    berechtigung:    Boolean,
    ressource:       Boolean,
    admin:           Boolean
});
var User = mongoose.model('user', userSchema);


/*********************************
 * Exports models
 ********************************/
module.exports = {    Aufgabenbefugniss : Aufgabenbefugniss
                    , Berechtigung : Berechtigung
                    , Aufgabe : Aufgabe 
                    , Befugniss : Befugniss
                    , Daten : Daten
                    , Dokument : Dokument
                    , Fahrzeug : Fahrzeug
                    , Hardware : Hardware
                    , Log : Log
                    , Mitarbeiter: Mitarbeiter
                    , Papierdokument : Papierdokument
                    , Raum : Raum
                    , Ressource : Ressource
                    , Rolle : Rolle
                    , Standort: Standort
                    , Status  : Status     
                    , Tresor  : Tresor
                    , User : User
                    , Zutrittsmittel : Zutrittsmittel };