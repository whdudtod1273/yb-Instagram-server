const models = require('../../models')
const passwordHash = require('../../helpers/passwordHash')

// 로그인 조회
exports.get_is_login = (req, res) => {
  if(req.user) {
    res.status(200).send(req.user)
  } else {
    res.status(404).send('로그인 중이 아닙니다')
  }
}

// 회원가입
exports.post_join = (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.username) {
    res.send(400, '입력을 제대로 하지 않았습니다.')
    return
  }

  const createUser = () => {
    models.User.create(req.body).then(() => {
      res.status(200).send('회원가입 완료 !')
    })
  }

  models.User.findOne({ where: { email: req.body.email } })
    .then(data => {
      if (data) {
        res.send(400, '이미 가입된 이메일이 있습니다.')
      } else {
        createUser()
      }
    })
    .catch(error => res.send(error))
}

// 로그인
exports.post_login = (req, res) => {
  if(req.user) {
    res.status(200).send('로그인 성공')
  } else {
    res.status(404).send('BAD REQUEST')
  }
}

// 로그아웃
exports.post_logout = (req, res) => {
  req.logout()
  req.session.save(()=> {
    res.status(200).send('로그아웃 완료 ')
  })
}