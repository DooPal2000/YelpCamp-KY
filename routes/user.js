const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const { storeReturnTo } = require('../middleware');


router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', catchAsync(async(req,res) => {
    try{
        const { email, username, password } = req.body;
        //await User.deleteMany({ username: username });
    
        const user = new User({email,username});
        const registerUser = await User.register(user,password);
        req.flash('success', 'Welcome to YelpCamp!');
        res.redirect('/campgrounds');
    
    } catch(e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}));

router.get('/login',  (req,res)=> {
    res.render('users/login');    
});

// PASSPORT 보안 강화로 인해 로그인 시 세션 초기화, 아래 코드 사용 
// 이렇게 수정하면, 최신 버전의 Passport.js를 사용해도 애플리케이션에서 사용자가 로그인 페이지 전에 방문 중이던 페이지로 정확하게 리디렉션됩니다.

router.post('/login',

    // use the storeReturnTo middleware to save the returnTo value from session to res.locals

    storeReturnTo,

    // passport.authenticate logs the user in and clears req.session

    passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}),

    // Now we can use res.locals.returnTo to redirect the user after login

    (req, res) => {
        req.flash('success', 'Welcome back!');
        const redirectUrl = res.locals.returnTo || '/campgrounds'; // update this line to use res.locals.returnTo now
        delete req.session.returnTo;
        res.redirect(redirectUrl);
    });

    router.get('/logout', (req, res, next) => {

        req.logout(function (err) {
    
            if (err) {
    
                return next(err);
    
            }
    
            req.flash('success', 'Goodbye!');
    
            res.redirect('/campgrounds');
    
        });
    
    }); 
    


module.exports = router;