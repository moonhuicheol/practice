const router = require('express').Router();
const userRepository = require('../repository/userRepository');

router.post('/', (req, res) => {
    let member = req.body;
    const result = userRepository.signup(member);
    console.log(member);
    if (result) {
        res.json({ result, message: '회원가입 완료'});  //result 가 왜 빈 객체인지??
    } else {
        res.status(500).send('회원가입 실패');
    }
});

//회원아이디 중복
//비밀번호 필수, 아이디필수,
//이메일 확인(이메일확인양식 asldfkasdjf@dakfdk.com)
//실제로 있는 사이트인지 확인하는법은 이메일로 전송해서 가입완료 절차를 하기때문
//특수문자 설정(비밀번호)
//이메일이 (있는건지 없는건지) 이메일전송을통해서 검증
//api 호환해서 가입
module.exports = router;