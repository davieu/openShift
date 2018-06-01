module.exports = {
    checkAuthenticated: function(req, res, next){
        if(req.isAuthenticated() && req.user.access){
            return next();
        }
        if(req.user){
            res.render('index/register', {message: `Thank you, ${req.user.firstName} ${req.user.lastName}. We will review your request.`});
        } else{
            res.redirect('/');
        }
    },
    checkAdmin: function(req, res, next){
        if(req.isAuthenticated() && req.user.role){
            return next();
        } 
        res.redirect('/');
    },
    checkGuest: function(req, res, next){
        if(req.isAuthenticated()){
            res.redirect('/dashboard');
        } else{
            return next();
        }
    }
}