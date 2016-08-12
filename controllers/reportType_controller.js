/*
 * Initation
 */
var Model = require('../models/models.js');
var ReportType = Model.ReportType;

exports.create = function (req, res){
   var reportType = new ReportType();
    reportType.set('bezeichnung', req.body.bezeichnung);
    console.log(req.body.bezeichnung);
    reportType.set('beschreibung', req.body.beschreibung); 
    reportType.set('display', req.body.bezeichnung);
    reportType.save(function(err){
        if(err){
            console.log('err: ' + err);
        } else {
            res.json(reportType);
        }
    });
};

exports.delete = function (req, res){
    ReportType.findOneAndRemove({_id: req.body._id}, function(err){
        if (err){
            console.log('err: ' + err);
        } else {
            res.json({msg: 'Objekt gelöscht'});
        }
    });
};

exports.save = function (req, res){
    ReportType.findOne({_id: req.body._id}).exec(function(err, reportType) {
        if (err) {
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            if (req.body.bezeichnung !== undefined & req.body.bezeichnung !== null) {
                reportType.bezeichnung = req.body.bezeichnung;
                reportType.display = req.body.bezeichnung;
            }
            if (req.body.beschreibung !== undefined & req.body.beschreibung !== null) {
                reportType.beschreibung = req.body.beschreibung;
            }
            reportType.save(
                function(err){
                    if(err){
                        console.log('err: ' + err);
                    } else {
                        res.json(reportType);
                    }
                }
            );
        }
    }); 
};

exports.list = function(req, res){
    console.log('in list');
    ReportType.find().exec(function(err, reportTypen) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            res.send(reportTypen);
        }
    });
};

exports.get = function(req, res){
    console.log('in get');
    ReportType.find({_id: req.query['id']}).exec(function(err, reportType) {
        if (err) {
            console.log('err: ' + err);
            return res.status(400).send({
                msg: err.getErrorMessage(err)
            });
        } else {
            res.json({object : reportType});
        }
    });
};

exports.get_new_obj = function(req, res){
    console.log('in get_new_obj');
    var reportType = new ReportType();
    reportType.bezeichnung = 'neu';
    reportType.beschreibung = 'neu';
    res.json({object : reportType});
};