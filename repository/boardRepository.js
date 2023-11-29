const connection = require('./connection');

const query = {
    insert: "INSERT INTO board (`title`, `content`, `writer_id`) VALUES (?,?,?)",
    readOneBoard: "SELECT * FROM board WHERE id = ?",
    readBoards: "SELECT * FROM  board",
    update: "UPDATE board SET title = ?, content = ? WHERE id = ?",
    delete: "DELETE FROM board WHERE id = ?"
}

async function insert(board, parseToken) {
    try {
        const conn = await connection();
        return [row] = await conn.execute(query.insert, [board.title, board.content, parseToken.id]);
    } catch (err) {
        console.error(err);
    }
}

async function update(board, id) {
    try {
        const conn = await connection();
        return [row] = await conn.execute(query.update, [board.title, board.content, id]);
    } catch (err) {
        console.error(err);
    }
}

async function readBoards() {
    const { page = 1, limit = 5} = req.query;
    const offset = (page-1) * limit;
    
    try {
        const conn = await connection();
        return [row] = await conn.execute(query.findAll + 'LIMIT' + offset + ', ' + limit);
    } catch (err) {
        console.error(err);
    }
}

async function readOneBoard(id) {
    try {
        const conn = await connection();
        return [row] = await conn.execute(query.readOneBoard, [id]);
    } catch (err) {
        console.error(err);
    }
}

async function deleteBoard(id) {
    try{
        const conn = await connection();
        return [row] = await conn.execute(query.delete, [id]);
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    insert,
    update,
    readBoards,
    readOneBoard,
    deleteBoard
};