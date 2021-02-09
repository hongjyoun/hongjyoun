const passport = require('passport')
const bcrypt = require('bcrypt')
const db = require('../models')
const { Strategy: LocalStrategy } = require('passport-local')

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'email', // req.body.email
    passwordField: 'password' // req.body.password
  }, async (email, password, done)=> {
    try{
      const exUser = await db.User.findOne({ where: { email } }) // 사용자가 존재하는지 확인
      if (!exUser) { // 존재하지 않으면
        return done(null, false, { reason: '존재하지 않는 사용자입니다' })
      }
      const result = await bcrypt.compare(password, exUser.password)
      if (result) { // 사용자가 존재하고, 비밀번호까지 맞으면
        return done(null, exUser) // 성공
      } else {
        return done(null, false, { reason: '비밀번호가 틀립니다.' })
      }
    } catch(err) {
      console.error(err)
      return done(err)
    }
  }))
}