const express = require('express');
const mongoose = require('mongoose');
const Post = mongoose.model('posts');
const router = express.Router();
const {checkAuthenticated, checkGuest} = require('../helpers/auth');

router.get('/', checkGuest, (req, res) => {
    res.render('index/welcome');
});

router.get('/dashboard', checkAuthenticated, (req, res) => {
    Post.find({user: req.user.id})
        .then(posts => {
            res.render('index/dashboard', {
                posts: posts
            });
        })
        .catch(error => console.log(error));
});

router.get('/about', (req, res) => {
    res.render('index/about');
});

module.exports = router;