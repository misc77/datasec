/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var crypto = require('crypto');
var express = require('express');

module.exports = function(app) {
    var user = require('./controllers/user_controller');
    var mitarbeiter = require('./controllers/mitarbeiter_controller');
    var standort = require('./controllers/standort_controller');
    var aufgabe = require('./controllers/aufgabe_controller');
    var daten = require('./controllers/daten_controller');
    var rolle = require('./controllers/rolle_controller');
    var fahrzeug = require('./controllers/fahrzeug_controller');
    app.use('/static', express.static('./static'))
            .use('/lib', express.static('../lib'));
    
    
    /**************************
     *      Standort Routes 
     ***************************/
    app.post('/api/standort/create',    standort.create); 
    app.post('/api/standort/save',      standort.save); 
    app.post('/api/standort/delete',    standort.delete); 
    app.get('/api/standort/list',       standort.list) ;
    app.get('/api/standort/get',        standort.get) ;
    
    /**************************
     *      Aufgabe Routes 
     ***************************/
    app.post('/api/aufgabe/create',    aufgabe.create); 
    app.post('/api/aufgabe/save',      aufgabe.save); 
    app.post('/api/aufgabe/delete',    aufgabe.delete); 
    app.get('/api/aufgabe/list',       aufgabe.list) ;
    app.get('/api/aufgabe/get',        aufgabe.get) ;
    
    /**************************
     *      Daten Routes 
     ***************************/
    app.post('/api/daten/create',    daten.create); 
    app.post('/api/daten/save',      daten.save); 
    app.post('/api/daten/delete',    daten.delete); 
    app.get('/api/daten/list',       daten.list) ;
    app.get('/api/daten/get',        daten.get) ;
    
     /**************************
     *      Rollen Routes 
     ***************************/
    app.post('/api/rolle/create',    rolle.create); 
    app.post('/api/rolle/save',      rolle.save); 
    app.post('/api/rolle/delete',    rolle.delete); 
    app.get('/api/rolle/list',       rolle.list) ;
    app.get('/api/rolle/get',        rolle.get) ;
    
     /**************************
     *      Fahrzeug Routes 
     ***************************/
    app.post('/api/fahrzeug/create', fahrzeug.create); 
    app.post('/api/fahrzeug/save',   fahrzeug.save); 
    app.post('/api/fahrzeug/delete', fahrzeug.delete); 
    app.get('/api/fahrzeug/list',    fahrzeug.list) ;
    app.get('/api/fahrzeug/get',     fahrzeug.get) ;
    
    /**************************
     *      Mitarbeiter Routes 
     ***************************/
    app.post('/api/mitarbeiter/create', mitarbeiter.create );
    
    /**************************
     *      USER Routes 
     ***************************/
    //home
    app.get('/', function(req, res){
         if(req.session.user) {
            res.render('index', { username: req.session.username, msg:req.session.msg, submenu:req.session.submenu } );
        }else {
            res.redirect('/login');
        }
    });    
    //modify user
    app.get('/user', function(req, res){
        if(req.session.user){
            res.render('user');
        } else {
            res.redirect('/login', {message: 'Access denied!'});
        }
    });    
    //signup
    app.get('/signup', function(req, res){
        if(req.session.user){
            res.redirect('/', { username: req.session.user.name});
        } 
        res.render('signup');
    });
    //login
    app.get('/login', function(req, res){
        if(req.session.user){
            res.redirect('/', { username: req.session.user.name});
        }
        res.render('login');
    });
    //logout
    app.get('/logout', function(req, res){
        if(req.session.user){
            req.session.destroy(function(){
                res.redirect('/login');
            });
        }
    });
    app.get('*',function(req, res){
        res.render('index');
    });    
    app.post('/signup',       user.signup);
    app.post('/user/update',  user.updateUser);
    app.post('/user/delete',  user.deleteUser);
    app.post('/login',        user.login);
    app.post('/user/profile', user.getUserProfile);
};