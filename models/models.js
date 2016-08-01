/* 
 * Schema für Anwendung
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/DataSec');
var Schema = mongoose.Schema;

var protokollSchema = new Schema ({
    user:      { type: Schema.Types.ObjectId, ref: 'user'},
    eintrag:     String ,
    datum:      Date 
});
var Protokoll = mongoose.model("protokoll", protokollSchema);

/*****************/
/* Hauptschemata */
/*****************/
/* Aufgabe */
var aufgabeSchema = new Schema({
    bezeichnung:    String,
    display:        String,
    beschreibung:   String,
    aktiv:          Boolean
});
var Aufgabe = mongoose.model("aufgabe", aufgabeSchema);

/* Beschäftigungsverhältnis */
var beschaeftigungSchema = new Schema({
    bezeichnung:    String,
    display:        String,
    beschreibung:   String,
    aktiv:          Boolean
});
var Beschaeftigung = mongoose.model("beschaeftigung", beschaeftigungSchema);

/* Berechtigung */
var rechteSchema = new Schema({
    bezeichnung:    String,
    display:        String,
    beschreibung:   String
});
var Rechte = mongoose.model("rechte", rechteSchema);

/* Datenschutzerklärungsdokumente */
var dokumentSchema = new Schema({
    bezeichnung:    String,
    display:        String,
    beschreibung:   String,
    binary:         String,  //Document in binary representation
    unterzeichnet:  Date,
    dokumentTyp:    {type: Schema.Types.ObjectId, ref: 'dokumentTyp'}
});
var Dokument = mongoose.model("dokument", dokumentSchema);

var dokumentTypSchema = new Schema({
    bezeichnung:    String,
    display:        String,
    beschreibung:   String,
    template:       String,
    version:        String,
    obligatorisch:  Boolean
});
var DokumentTyp = mongoose.model("dokumentTyp", dokumentTypSchema);

/* Daten */
var datenSchema = new Schema({
    bezeichnung:    String,
    display:        String,
    sensibel:       Boolean
});
var Daten = mongoose.model("daten", datenSchema);

/* Fahrzeug */
var fahrzeugSchema = new Schema({
    kennzeichen:    String,
    display:        String,
    beschreibung:   String,
    standort:       {type: Schema.Types.ObjectId, ref: 'standort'},
    aktiv:          Boolean,
    navigation:     Boolean,
    reset:          Boolean,
    protokoll:      [{ type: Schema.Types.ObjectId, ref: 'protokoll' }]
});
var Fahrzeug = mongoose.model("fahrzeug", fahrzeugSchema);

/* IT-Hardware */
var hardwareSchema = new Schema({
    bezeichnung:        String,
    display:            String,
    inventarNr:         String,
    aktiv:              Boolean,
    deaktiviertAm:      Date,
    quittierung:        Boolean,
    verwendungszweck:   String,
    mobiledevmgmt:      Boolean,
    protokoll:      [{ type: Schema.Types.ObjectId, ref: 'protokoll' }]
});
var Hardware = mongoose.model("hardware", hardwareSchema);

/* RessourcenTyp */
var ressourcenTypSchema = new Schema({
   bezeichnung:     String,
   display:         String,
   aktiv:           Boolean
});
var RessourcenTyp = mongoose.model("ressourcentyp", ressourcenTypSchema);

/* Ressourcen */
var ressourceSchema = new Schema({
    bezeichnung:   String,
    display:       String,
    beschreibung:  String,
    typ:           {type: Schema.Types.ObjectId, ref: 'ressourcentyp'},
    aktiv:         Boolean,
    daten:         [{type: Schema.Types.ObjectId, ref: 'daten'}],
    protokoll:      [{ type: Schema.Types.ObjectId, ref: 'protokoll' }]
});
var Ressource = mongoose.model("ressource", ressourceSchema);

/* Mitarbeiter */
var mitarbeiterSchema = new Schema({
    mitarbeiternr:      String,
    display:            String,
    vorname:            String,
    nachname:           String,
    string:             String,
    geburtsdatum:       Date,
    standort:           {type: Schema.Types.ObjectId, ref: 'standort'},
    aufgabe:            {type: Schema.Types.ObjectId, ref: 'aufgabe'},
    status:             {type: Schema.Types.ObjectId, ref: 'mitarbeiterStatus'},
    beschaeftigung:     {type: Schema.Types.ObjectId, ref: 'beschaeftigung'},
    statusSeit:         Date,
    rolle:              {type: Schema.Types.ObjectId, ref: 'rolle'},
    urlaubsvertretung:  {type: Schema.Types.ObjectId, ref: 'mitarbeiter'},
    vertretungSeit:     Date,
    vertretungBis:      Date,
    befugniss_init:     Boolean,
    protokoll:      [{ type: Schema.Types.ObjectId, ref: 'protokoll' }]
});
var Mitarbeiter = mongoose.model("mitarbeiter", mitarbeiterSchema);

/* Papierdokument */
var papierdokumentSchema = new Schema({
    bezeichnung:    String,
    display:        String,
    beschreibung:   String,
    aktiv:          Boolean,
    daten:          [{type: Schema.Types.ObjectId, ref: 'daten'}],
    protokoll:      [{ type: Schema.Types.ObjectId, ref: 'protokoll' }]
});
var Papierdokument = mongoose.model("papierdokument", papierdokumentSchema);

/* Rolle */
var rolleSchema = new Schema({
    bezeichnung:    String,
    display:        String,
    beschreibung:   String,
    aktiv:          Boolean
});
var Rolle = mongoose.model("rolle", rolleSchema);

/* Tresor */
var tresorSchema = new Schema({
    bezeichnung:    String,
    display:        String,
    beschreibung:   String,
    aktiv:          Boolean,
    daten:          [{type: Schema.Types.ObjectId, ref: 'daten'}],
    protokoll:      [{ type: Schema.Types.ObjectId, ref: 'protokoll' }]
});
var Tresor = mongoose.model("tresor", tresorSchema);

/* Standort */
var standortSchema = new Schema({
   bezeichnung:     String,
   display:         String,
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
var mitarbeiterStatusSchema = new Schema({
   bezeichnung:   String,
   display:       String,
   beschreibung:  String,
   aktiv_status:  Boolean
});
var MitarbeiterStatus = mongoose.model("mitarbeiterStatus", mitarbeiterStatusSchema);

/* Zutrittsmittel */
var zutrittsmittelSchema = new Schema({
    bezeichnung:  String,
    display:      String,
    beschreibung: String,
    ausgabe:      Date,
    rueckgabe:    Date,
    status:       { type: Schema.Types.ObjectId, ref : 'zutrittsmittelStatus' },
    protokoll:      [{ type: Schema.Types.ObjectId, ref: 'protokoll' }]
});
var Zutrittsmittel = mongoose.model("zutrittsmittel", zutrittsmittelSchema);

/* Zutrittsmittel Status */
var zutrittsmittelsStatusSchema = new Schema({
    bezeichnung:    String,
    display:        String,
    beschreibung:   String,
    gueltig:        Boolean
});
var ZutrittsmittelStatus = mongoose.model("zutrittsmittelStatus", zutrittsmittelsStatusSchema);

/* Raum */
var raumSchema = new Schema({
   bezeichnung:    String,
   display:        String,
   beschraenkt:    Boolean,
   zutrittvon:     Date,
   zutrittbis:     Date,
   daten:          [{type: Schema.Types.ObjectId, ref: 'daten'}],
   zutrittsmittel: [{type: Schema.Types.ObjectId, ref: 'zutrittsmittel'}]
});
var Raum = mongoose.model("raum", raumSchema);


/* Musterrolle */
/** Template für Befugnisse **/
var musterrolleSchema = new Schema({
    bezeichnung:        String,
    display:            String,
    aufgabe:            { type: Schema.Types.ObjectId, ref: 'aufgabe'},
    beschaeftigung:     { type: Schema.Types.ObjectId, ref: 'beschaeftigung'},
    tresor_zuo:         [ { tresor:         {type: Schema.Types.ObjectId, ref: 'tresor'},
                            zutrittsmittel: {type: Schema.Types.ObjectId, ref: 'zutrittsmittel' } }],  
    raum_zuo:           [ { raum:           {type: Schema.Types.ObjectId, ref: 'raum'}, 
                            zutrittsmittel: {type: Schema.Types.ObjectId, ref: 'zutrittsmittel' } }], 
    fahrzeugliste:      [ { fahrzeug:       {type: Schema.Types.ObjectId, ref: 'fahrzeug'} }],
    ressource_zuo:      [ { ressource:      {type: Schema.Types.ObjectId, ref: 'ressource'},
                            rechte:         {type: Schema.Types.ObjectId, ref: 'rechte'} }],
    hardware_zuo:       [ { hardware:       {type: Schema.Types.ObjectId, ref: 'hardware'},
                            berechtigung:   {type: Schema.Types.ObjectId, ref: 'berechtigung'} }],
    byod:               Boolean,
    fernzugriff:        Boolean,
    aktiv:              Boolean
});
var Musterrolle = mongoose.model("musterrolle", musterrolleSchema);

/* Befugniss */
/** Haupt-Collection zur Zuordnung der Befugnisse pro Mitarbeiter auf Basis der Musterrolle **/
var befugnissSchema = new Schema({
    mitarbeiter:     {type: Schema.Types.ObjectId, ref: 'mitarbeiter'},
    display:         String,
    raum_zuo:        [ { raum:           {type: Schema.Types.ObjectId, ref: 'raum'}, 
                         zutrittsmittel: {type: Schema.Types.ObjectId, ref: 'zutrittsmittel' } }],
    tresor_zuo:      [ { tresor:         {type: Schema.Types.ObjectId, ref: 'tresor'},
                         zutrittsmittel: {type: Schema.Types.ObjectId, ref: 'zutrittsmittel' } }],
    fahrzeugliste:   [ { fahrzeug:       {type: Schema.Types.ObjectId, ref: 'fahrzeug'} }],
    hardware_zuo:    [{ hardware:       {type: Schema.Types.ObjectId, ref: 'hardware'},
                        berechtigung:   {type: Schema.Types.ObjectId, ref: 'berechtigung'} }],
    ressource_zuo:   [{ ressource:      {type: Schema.Types.ObjectId, ref: 'ressource'},
                        rechte:         {type: Schema.Types.ObjectId, ref: 'rechte'} }],
    byod:            Boolean,
    fernzugriff:     Boolean,
    is_init:         Boolean,
    protokoll:      [{ type: Schema.Types.ObjectId, ref: 'protokoll' }]
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
    name:                   { type: String, unique: true, index: true },
    display:                String,
    pwd:                    String,
    email:                  String,
    rolle:                  { type: Schema.Types.ObjectId, ref: 'rolle' },
    aktiv:                  Boolean,
    locked:                 Boolean,
    mitarbeiter:            Boolean,
    raum:                   Boolean,
    fuhrpark:               Boolean,
    hardware:               Boolean,
    rechte:                 Boolean,
    ressourcen:             Boolean,
    musterrolle:            Boolean,
    auswertungen:           Boolean,
    dokumente:              Boolean,
    befugnisse:             Boolean,
    aufgabe:                Boolean,
    beschaeftigung:         Boolean,
    datentyp:               Boolean,
    ressourcentyp:          Boolean,
    tresor:                 Boolean,
    zutrittsmittel:         Boolean,
    mitarbeiterstatus:      Boolean,
    zutrittsmittelstatus:   Boolean,
    standort:               Boolean,
    admin:                  Boolean
});
var User = mongoose.model('user', userSchema);


/*********************************
 * Exports models
 ********************************/
module.exports = {    Musterrolle : Musterrolle
                    , Rechte : Rechte
                    , Aufgabe : Aufgabe 
                    , Befugniss : Befugniss
                    , Beschaeftigung : Beschaeftigung
                    , Daten : Daten
                    , Dokument : Dokument
                    , DokumentTyp : DokumentTyp
                    , Fahrzeug : Fahrzeug
                    , Hardware : Hardware
                    , Log : Log
                    , Mitarbeiter: Mitarbeiter
                    , Papierdokument : Papierdokument
                    , Raum : Raum
                    , Ressource : Ressource
                    , RessourcenTyp : RessourcenTyp
                    , Rolle : Rolle
                    , Standort: Standort
                    , MitarbeiterStatus  : MitarbeiterStatus     
                    , Tresor  : Tresor
                    , User : User
                    , Zutrittsmittel : Zutrittsmittel
                    , ZutrittsmittelStatus : ZutrittsmittelStatus
                    , Protokoll : Protokoll};