/* 
 * Init Collections with Documents
 * 
 * TODO: Drop Documents on the start of init
 */
var Schema = require("../models/models.js");
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/DataSec');

/** Standort **/
var sb = new Schema.Standort({bezeichnung: 'Saarbrücken', land: 'Deutschland', hauptstandort: false});
sb.save( function (err, sb){
    if(err) return console.error(err);
});
var berlin = new Schema.Standort({bezeichnung: 'Berlin', land: 'Deutschland', hauptstandort: true});
berlin.save( function (err, berlin){
    if(err) return console.error(err);
});