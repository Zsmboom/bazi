const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google OAuth 登录路由
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth 回调路由
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.send(`
      <script>
        window.opener.postMessage({ type: 'LOGIN_SUCCESS', user: ${JSON.stringify(req.user)} }, '*');
        window.close();
      </script>
    `);
  }
);

// 登出路由
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// 获取当前用户信息
router.get('/user', (req, res) => {
  res.json(req.user || null);
});

module.exports = router; 