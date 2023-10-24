const mysql = require("mysql2");

const conn = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "ecommerce",
});

conn.connect(err => {
    if (err) throw err;
    console.log("Database connected !!");
});

module.exports = conn;