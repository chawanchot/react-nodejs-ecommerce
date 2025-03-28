const mysql = require("mysql2");

const conn = mysql.createConnection('mysql://VXBz8QdB46d62Qd.root:cdfmdHr9nroP3HFI@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/ecommerce?ssl={"rejectUnauthorized":true}');

conn.connect(err => {
    if (err) throw err;
    console.log("Database connected !!");
});

module.exports = conn;