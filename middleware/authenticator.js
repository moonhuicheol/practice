const {
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    TOKEN_PREFIX,
    ALGORITHM,
    ACCESS_EXPIRES,
    REFRESH_EXPIRES,
} = process.env;

const userRepository = require('../repository/userRepository');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function authenticator(req, res) {
    const member_login = req.body;
    const [member] = await userRepository.findByMember_email(member_login.email);
    
    if(member){
        if (bcrypt.compareSync(member_login.password, member[0].password)) {
            //토큰생성(accessToken과 resfresh토큰 둘다)하고 응답을 보낸다.
            const accessToken = generateAccessToken({ id:  member[0].id });
            const refreshToken = generateRefreshToken({ id: member[0].id });

            res.cookie("refreshToken", refreshToken, { maxAge: 1000 * 60 * 60 * 24 * 7 });
            res.header["Authorization"] = accessToken;
            res.json({ accessToken, message: "로그인 완료" });
        } else {
            res.status(400).send('비밀번호가 일치하지 않습니다.');
        }
    } else {
        res.status(500).send('해당 회원이 없습니다.');
    }
}

function generateAccessToken(user) {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, {
      issuer: "my-service",
      algorithm: ALGORITHM,
      expiresIn: ACCESS_EXPIRES,
    });
}

function generateRefreshToken(user) {
    return jwt.sign(user, REFRESH_TOKEN_SECRET, {
        issuer: "my-service",
        algorithm: ALGORITHM,
        expiresIn: REFRESH_EXPIRES,
    });
}

function parseAccessToken(token) {
    return parseToken(token.split(" "), ACCESS_TOKEN_SECRET);
}

// function parseRefreshToken(token) {
//     return parseToken([TOKEN_PREFIX, token], REFRESH_TOKEN_SECRET);
// }

function parseToken([bearer, token], secret) {
    if (bearer !== TOKEN_PREFIX) {
        throw new InvalidTokenError();
    }

return jwt.verify(token, secret, { algorithm: ALGORITHM });
}

module.exports = {
    authenticator,
    parseAccessToken
};