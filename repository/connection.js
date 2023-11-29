const mysql = require("mysql2/promise");

let pool = mysql.createPool({
    host: "host.docker.internal",
    port: 3306,
    user: "admin",
    password: "0000",
    database: "server-study",
});

module.exports = async function () {
    try {
        const conn = await pool.getConnection();
        return conn;
    } catch (error) {
        throw error;
    }
};
