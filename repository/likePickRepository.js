const connection = require('./connection');

const query = {
    findLike_pickByMember: "SELECT * FROM like_pick WHERE board_id = ? AND member_id = ?",
    deleteLike_pick: "DELETE FROM like_pick WHERE board_id = ? AND member_id = ?",
    insertLike_pick: "INSERT INTO like_pick (`board_id`, `member_id`) VALUES (?, ?)",
    findLike_pickAll: "SELECT * FROM like_pick WHERE board_id = ?",
    countLike_pick: "SELECT count(*) FROM like_pick WHERE board_id =?"
}

async function findLike_pickByMember(board_id, parseToken) {
    try {
        const conn = await connection();
        return [row] = await conn.execute(query.findLike_pickByMember, [board_id, parseToken.id]);
    } catch (err) {
        console.error(err);
    }
}

async function deleteLike_pick(board_id, parseToken) {
    try {
        const conn = await connection();
        return [row] = await conn.execute(query.deleteLike_pick, [board_id, parseToken.id])
    } catch (err) {
        console.error(err);
    }
}

async function insertLike_pick(board_id, parseToken) {
    try {
        const conn = await connection();
        return [row] = await conn.execute(query.insertLike_pick, [board_id, parseToken.id]);
    } catch (err) {
        console.error(err);
    }
}

async function findLike_pickAll(board_id) {
    try {
        const conn = await connection();
        return [row] = await conn.execute(query.findLike_pickAll, [board_id]);
    } catch (err) {
        console.error(err);
    }
}

async function countLike_pick(board_id) {
    try {
        const conn = await connection();
        return [row] = await conn.execute(query.countLike_pick, [board_id]);
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    findLike_pickByMember,
    deleteLike_pick,
    insertLike_pick,
    findLike_pickAll,
    countLike_pick
}