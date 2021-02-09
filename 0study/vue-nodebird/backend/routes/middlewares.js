exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()){
    return next()  // next 괄호안에 인수가 아무것도 없을 때는 다음 미들웨어로 넘어감. 인수가 있으면 에러처리로 넘어감.
  }
  return res.status(401).send('로그인이 필요합니다')
}

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()){
    return next()
  }
  return res.status(401).send('로그인한 사람은 이용할 수 없습니다')
}