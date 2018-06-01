const express = require('express');
const router = express.Router();

const { checkAuthenticated, checkAdmin } = require('../helpers/auth');
const { getAll, toggleAccess, toggleAdmin } = require('../controllers/userController');

router.get('/', checkAdmin, checkAuthenticated, (req, res) => {
    getAll((users) => {
        res.render('admin/users', { users: users });
    });
});

router.put('/access/:id', checkAdmin, checkAuthenticated, (req, res) => {
    toggleAccess(req.params.id, (user) => {
                res.render('index/dashboard', {message: `Access changed for ${user.firstName} ${user.lastName}`});
    });
});

router.put('/role/:id', checkAdmin, checkAuthenticated, (req, res) => {
    toggleAdmin(req.params.id, (user) => {
        res.render('index/dashboard', {message: `Role changed for ${user.firstName} ${user.lastName}`});
    });
});

module.exports = router;