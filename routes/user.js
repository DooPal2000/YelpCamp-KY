const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const { storeReturnTo } = require('../middleware');
const User = require('../models/user');
const users = require('../controllers/users');


router.get('/register', users.renderRegister);

router.post('/register', catchAsync(users.register));

// PASSPORT 보안 강화로 인해 로그인 시 세션 초기화, 아래 코드 사용 
// 이렇게 수정하면, 최신 버전의 Passport.js를 사용해도 애플리케이션에서 사용자가 로그인 페이지 전에 방문 중이던 페이지로 정확하게 리디렉션됩니다.
router.get('/login', users.renderLogin);

router.post('/login',

    // use the storeReturnTo middleware to save the returnTo value from session to res.locals

    storeReturnTo,

    // passport.authenticate logs the user in and clears req.session

    passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}),

    // Now we can use res.locals.returnTo to redirect the user after login

    users.login);

    
router.get('/logout', users.logout); 


module.exports = router;