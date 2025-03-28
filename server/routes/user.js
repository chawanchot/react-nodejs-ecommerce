const express = require("express");
const router = express.Router();
const conn = require("../config/database");
const jwtAuth = require("../middleware/jwtAuth");

router.get("/profile", jwtAuth, (req, res) => {
    conn.execute(
        "SELECT * FROM users WHERE id = ?",
        [req.auth.id],
        function(err, result, field) {
            if (err) {
                res.status(500).json({
                    status: "error",
                    message: "ระบบไม่สามารถโหลดข้อมูลได้",
                    errors: err,
                });
                return;
            };
            if (result.length === 0) {
                res.status(400).json({
                    status: "error",
                    message: "ไม่พบข้อมูลบัญชีผู้ใช้",
                });
                return;
            };

            let newData = result.map((user) => {
                delete user.password;
                return user;
            });
            
            res.status(200).json({ 
                status: "success", 
                data: newData,
            });
        }
    );
});

module.exports = router;
