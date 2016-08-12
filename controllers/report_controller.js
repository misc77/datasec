/*
 * Initation
 */
var Model = require('../models/models.js');
var Report = Model.Report;

var self = module.exports = {
    create : function (req, res){
        console.log('create report...');
        
       var report = new Report();
        report.set('display',          req.body.bezeichnung);
        report.set('bezeichnung',      req.body.bezeichnung);
        report.set('beschreibung',     req.body.beschreibung);
        report.set('abfrage',          req.body.abfrage);
        
        report.save(function(err){
            if(err){
                console.log('err: ' + err);
            } else {
                console.log('saved report: ' + JSON.stringify(report));              
            }
        });
    },

    delete : function (req, res){
        Report.findOneAndRemove({_id: req.body._id}, function(err){
            if (err){
                console.log('err: ' + err);
            } else {
                res.json({msg: 'Objekt gelöscht'});
            }
        });
    },
    
    query : function (req, res) {
        return null;
    },

    save : function (req, res){
        if (req.body.is_init){
            self.create(req, res);
        } else {
            Report.findOne({_id: req.body._id}).exec(function(err, report) {
                if (err) {
                    return res.status(400).send({
                        msg: err.getErrorMessage(err)
                    });
                } else {
                    if (req.body.mitarbeiter !== undefined & req.body.mitarbeiter !== null) {
                        report.bezeichnung = req.body.bezeichnung;
                        report.display = req.body.mitarbeiter.mitarbeiternr + '-' + req.body.mitarbeiter.nachname + ' ' + req.body.mitarbeiter.vorname + ' (' + req.body.mitarbeiter.standort.bezeichnung + ')';
                    }
                    if (req.body.beschreibung !== undefined & req.body.beschreibung !== null) {
                        report.beschreibung = req.body.beschreibung;
                    }
                    if (req.body.abrage !== undefined & req.body.abfrage !== null) {
                        report.abfrage = req.body.abfrage;
                    }
                   
                    report.save(
                        function(err){
                            if(err){
                                console.log('err: ' + err);
                            } else {
                                res.json(report);
                            }
                        }
                    );
                }
            }); 
        }
    },

    list : function(req, res){
        Report.find()
                .populate('abfrage')
                .exec(function(err, report) {
            if (err) {
                console.log('err: ' + err);
                return res.status(400).send({
                    msg: err.message
                });
            } else {
                res.send(report);
            }
        });
    },

    get : function(req, res){
        Report.find({_id: req.query['id']})
            .populate('standort')
            .exec(function(err, report) {
            if (err) {
                console.log('err: ' + err);
                return res.status(400).send({
                    msg: err.getErrorMessage(err)
                });
            } else {
                res.json({object : report});
            }
        });
    },
    
    get_new_obj : function(req, res){
        var report = new Report();
            report.set('standort',          null);
            report.set('status',            null);
            report.set('aufgabe',           null);
            report.set('urlaubsvertretung', null);
            report.set('beschaeftigung',    null)
            report.set('bezeichnung',       'neu');
            report.set('beschreibung',      'neu');
            
        res.json({object : report});
    }
};


