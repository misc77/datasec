/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var crypto = require('crypto');
var express = require('express');

module.exports = function(app) {
    var user = require('./controllers/user_controller');
    app.use('/static', express.static('./static'))
            .use('/lib', express.static('../lib'));
    
    app.get('/', function(req, res){
        console.log('username: ' ||req.body.username);
        if(req.session.user) {
            res.render('index', { username: req.session.username, msg:req.session.msg, submenu:req.session.submenu } );
        }else {
            console.log('access denied');
            res.redirect('/login');
        }
    });
    
    app.get('/user', function(req, res){
        if(req.session.user){
            res.render('user');
        } else {
            res.redirect('/login', {message: 'Access denied!'});
        }
    });
    
    app.get('/signup', function(req, res){
        if(req.session.user){
            res.redirect('/', { username: req.session.user.name});
        } 
        res.render('signup');
    });
    
    app.get('/login', function(req, res){
        if(req.session.user){
            console.log('respond: user=' + req.session.user.name);
            res.redirect('/', { username: req.session.user.name});
        }
        res.render('login');
    });
    
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