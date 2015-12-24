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