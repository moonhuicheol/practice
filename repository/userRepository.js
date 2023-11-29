const connection = require('./connection');
const bcrypt = require('bcrypt');

const query = {
    findByMember_id: "SELECT * FROM member WHERE id = ?",
    findByMember_email: "SELECT * FROM member WHERE email = ?",
    signup: "INSERT INTO member (`email`, `password`, `nickname`) VALUES (?,?,?)"
}

async function findByMember_id(member_id) {
    try {
        const conn = await connection();
        return row = conn.execute(query.findByMember_id, [member_id]);
    } catch (error) {
        console.log(error);
    }
}

async function findByMember_email(member_email) {
    try {
        const conn = await connection();
        return [row] = await conn.execute(query.findByMember_email, [member_email]);
    } catch (error) {
        console.log(error);
    }
}

async function signup(member) {
    const bcryptPassword = bcrypt.hashSync(member.password, 11);

    try {
        const conn = await connection();
        const row = await conn.execute(query.signup, [member.email, bcryptPassword, member.nickname]);
        return row;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    findByMember_id,
    findByMember_email,
    signup
}