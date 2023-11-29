require('should');
const app = require('../index');
const request = require('supertest');

describe('회원가입테스트', () => {
    describe("POST /signup", () => {
        it("이메일, 비밀번호 입력 후 회원가입 완료", (done) => {
            request(app)
            .post('/signup')
            .send({ email: "test7@gmail.com" })
            .expect('Content-Type',/json/)
            .end((err, result) => {
                if(err) {
                    done(err);
                } else {
                    if (result.body.message === "회원가입 완료") {
                        done();
                    } else {
                        done('테스트가 통과하지않았습다.');
                    }
                }
            });
        });
    });
});