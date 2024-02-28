module.exports.isLoggedIn = (req,res,next) => {
    console.log("Req.user...", req.user)
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
        req.flash('error', '로그인 해 주세요.')
        return res.redirect('/login');
    }    
    next();
}


module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

