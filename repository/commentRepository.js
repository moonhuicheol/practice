const connection = require('./connection');

const query = {
    readComment: "SELECT * FROM comment WHERE board_id = ?",
    insert: "INSERT INTO comment (`content`, `writer_id`, `board_id`) VALUES (?,?,?)",
    put: "UPDATE comment SET content = ?, updated_at = now() WHERE id =?",
    delete: "DELETE from comment WHERE id = ?"
}

async function readComment(id) {
    try {
        const conn = await connection();
        return [row] = await conn.execute(query.readComment, [id]);
    } catch (err) {
        console.error(err);
    }
}

async function insert(comment, parseToken, board_id) {
    try {
        const conn = await connection();
        return [row] = await conn.execute(query.insert, [comment.content, parseToken.id, board_id]);
    } catch (err) {
        console.error(err);
    }
}

async function put(comment, id) {
    try {
        const conn = await connection();
        return [row] = await conn.execute(query.put, [comment.content, id]);
    } catch (err) {
        console.error(err);
    }
}

async function deleteComment(id) {
    try {
        const conn = await connection ();
        return [row] = await conn.execute(query.delete, [id]);
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    readComment,
    insert,
    put,
    deleteComment
}