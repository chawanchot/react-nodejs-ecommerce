const express = require("express");
const router = express.Router();
const conn = require("../config/database");
const jwtAuth = require("../middleware/jwtAuth");
const { body, validationResult } = require("express-validator");

router.post(
    "/",
    [
        body("product")
            .notEmpty()
            .withMessage("ไม่สำเร็จ")
            .isNumeric()
            .withMessage("ไม่สำเร็จ"),
    ],
    jwtAuth,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                status: "error",
                message: errors.array()[0].msg,
                errors: errors.array(),
            });
            return;
        }
        const { product } = req.body;
        conn.execute(
            "INSERT INTO favorite_product (users_id, product_id) VALUES (?, ?)",
            [req.auth.id, product],
            function (err, result, field) {
                if (err) {
                    res.status(400).json({
                        status: "error",
                        message: "ไม่สำเร็จ กรุณาลองใหม่",
                        errors: err,
                    });
                    return;
                }
                conn.execute("SELECT product.* FROM favorite_product INNER JOIN product ON favorite_product.product_id = product.id WHERE users_id = ?", [req.auth.id], function(err, result, field) {
                    if (err) {
                        res.status(400).json({ status: "error", message: err });
                        return;
                    }
                    res.status(200).json({ status: "success", data: result });
                })
            }
        );
    }
);

router.post(
    "/remove",
    [
        body("product")
            .notEmpty()
            .withMessage("ไม่สำเร็จ")
            .isNumeric()
            .withMessage("ไม่สำเร็จ"),
    ],
    jwtAuth,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                status: "error",
                message: errors.array()[0].msg,
                errors: errors.array(),
            });
            return;
        }
        const { product } = req.body;
        conn.execute(
            "DELETE FROM favorite_product WHERE users_id = ? AND product_id = ?",
            [req.auth.id, product],
            function (err, result, field) {
                if (err) {
                    res.status(400).json({ status: "error", message: err });
                    return;
                }
                conn.execute(
                    "SELECT product.* FROM favorite_product INNER JOIN product ON favorite_product.product_id = product.id WHERE users_id = ?",
                    [req.auth.id],
                    function (err, result, field) {
                        if (err) {
                            res.status(400).json({
                                status: "error",
                                message: err,
                            });
                            return;
                        }
                        res.status(200).json({
                            status: "success",
                            data: result,
                        });
                    }
                );
            }
        );
    }
);

router.get("/", jwtAuth, (req, res) => {
    conn.execute(
        "SELECT product.* FROM favorite_product INNER JOIN product ON favorite_product.product_id = product.id WHERE users_id = ?",
        [req.auth.id],
        function (err, result, field) {
            if (err) {
                res.status(400).json({ status: "error", message: err });
                return;
            }
            res.status(200).json({ status: "success", data: result });
        }
    );
});

module.exports = router;
