const express = require('express')
const bcrypt = require('bcrypt')
const passport = require('passport')
const db = require('../models')
const { isLoggedIn, isNotLoggedIn } = require('./middlewares')

const router = express.Router();

router.get('/', isLoggedIn, async (req, res, next) => {
  const user = req.user;
  res.json(user)
})


router.post('/', isNotLoggedIn, async (req, res, next) => {
  try {
    // console.log(req.body)
    const hash = await bcrypt.hash(req.body.password, 12)
    const exUser = await db.User.findOne({
      where: {
        email: req.body.email,
      }
    })
    if (exUser) {
      return res.status(403).json({
        errorCode: 1, //이건 임의로 지으면 됨
        message: '이미 회원가입되어있습니다.',
      })
    }
    const newUser = await db.User.create({
      email: req.body.email,
      password: hash,
      nickname: req.body.nickname,
    });
    return res.status(201).json(newUser)
  } catch (err) {
    console.error(err);
    return next(err);
  }
});


router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err, user, info)=>{
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason)
    }
    return req.login(user, async (err) => { // 세션에 사용자 정보 저장
      if (err) {
        console.error(err)
        return next(err)
      }
      return res.json(user);
    })
  })(req, res, next)
});

router.post('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy(); // 선택사항
  return res.status(200).send('로그아웃 되었습니다')
})

module.exports = router;