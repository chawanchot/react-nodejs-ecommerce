const express = require("express");
const router = express.Router();
const conn = require("../config/database");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { body, validationResult, custom } = require("express-validator");
const jwt = require("jsonwebtoken");

let refreshTokens = [];

router.post(
    "/register",
    [
        body("phone")
            .notEmpty()
            .withMessage("Please enter your phone number")
            .isNumeric()
            .withMessage("Invalid phone number")
            .isLength({ min: 10, max: 10 })
            .withMessage("Invalid phone number"),
        body("fname").notEmpty().withMessage("Please enter your name"),
        body("lname").notEmpty().withMessage("Please enter your last name."),
        body("pass")
            .notEmpty()
            .withMessage("Please enter your password")
            .custom((value, { req }) => {
                if (value !== req.body.confirmPass) {
                    throw new Error("Passwords do not match");
                }
                return true;
            }),
        body("address").notEmpty().withMessage("Please fill in the address"),
    ],
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
        const { phone, fname, lname, pass, address, ip } = req.body;
        conn.execute(
            "SELECT COUNT(*) AS count FROM users WHERE phone = ?",
            [phone],
            function (err, result, field) {
                if (err) {
                    res.status(400).json({ status: "error", message: err });
                    return;
                }
                if (result[0].count != 0) {
                    res.status(400).json({
                        status: "error",
                        message: "This phone number is already used in the system.",
                    });
                    return;
                }
                bcrypt.hash(pass, saltRounds, function (err, hash) {
                    if (err) {
                        res.status(400).json({
                            status: "error",
                            message: "Failed to register, please try again.",
                            errors: err,
                        });
                        return;
                    }
                    conn.execute(
                        "INSERT INTO users (phone, fname, lname, password, address, ip) VALUES (?, ?, ?, ?, ?, ?)",
                        [phone, fname, lname, hash, address, ip],
                        function (err, result, field) {
                            if (err) {
                                res.status(400).json({
                                    status: "error",
                                    message:
                                        "Failed to register, please try again.",
                                    errors: err,
                                });
                                return;
                            }
                            res.status(204).json();
                        }
                    );
                });
            }
        );
    }
);

router.post(
    "/login",
    [
        body("phone")
            .notEmpty()
            .withMessage("Please enter your phone number")
            .isNumeric()
            .withMessage("Invalid phone number")
            .isLength({ min: 10, max: 10 })
            .withMessage("Invalid phone number"),
        body("password").notEmpty().withMessage("Please enter your password"),
    ],
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
        const { phone, password } = req.body;
        conn.execute(
            "SELECT * FROM users WHERE phone = ?",
            [phone],
            function (err, result, field) {
                if (err) {
                    res.status(400).json({
                        status: "error",
                        message: "The system is unable to login, please try again.",
                        errors: err,
                    });
                    return;
                }
                if (result.length === 0) {
                    res.status(400).json({
                        status: "error",
                        message: "Account not found",
                    });
                    return;
                }
                bcrypt.compare(
                    password,
                    result[0].password,
                    function (err, ok) {
                        if (err) {
                            res.status(400).json({
                                status: "error",
                                message:
                                    "The system is unable to login, please try again.",
                                errors: err,
                            });
                            return;
                        }
                        if (ok) {
                            const token = jwt.sign(
                                {
                                    id: result[0].id,
                                    phone: result[0].phone,
                                },
                                process.env.SECRET_KEY,
                                { expiresIn: "3h" }
                            );
                            const refreshToken = jwt.sign(
                                {
                                    id: result[0].id,
                                    phone: result[0].phone,
                                },
                                process.env.SECRET_REFRESH,
                                { expiresIn: "12h" }
                            );
                            refreshTokens.push(refreshToken);

                            let newData = result.map((user) => {
                                delete user.password;
                                return user;
                            });

                            conn.execute("SELECT product_id FROM favorite_product WHERE users_id = ?", [result[0].id], function(err, result, field) {
                                if (err) {
                                    res.status(400).json({ status: "error", message: err });
                                    return;
                                }
                                res.status(200).json({
                                    status: "success",
                                    data: newData,
                                    fav: result,
                                    token: token,
                                    refreshToken: refreshToken,
                                });
                            })
                        } else {
                            res.status(400).json({
                                status: "error",
                                message: "Password is incorrect",
                            });
                        }
                    }
                );
            }
        );
    }
);

router.post("/refresh", (req, res) => {
    const refreshToken = req.headers.authorization;
    if (!refreshToken) {
        res.status(401).json();
        return;
    }
    if (!refreshTokens.includes(refreshToken.split(" ")[1])) {
        res.status(401).json();
        return;
    }
    try {
        const { id, phone } = jwt.verify(
            refreshToken.split(" ")[1],
            process.env.SECRET_REFRESH
        );
        const token = jwt.sign(
            { id: id, phone: phone },
            process.env.SECRET_KEY,
            { expiresIn: "1m" }
        );
        res.status(200).json({ status: "success", token: token });
    } catch (e) {
        res.status(401).json({
            status: "error",
            errors: `${e.name} : ${e.message}`,
        });
    }
});

router.post("/logout", (req, res) => {
    const refeshToken = req.headers.authorization;
    refreshTokens = refreshTokens.filter(
        (token) => token !== refeshToken.split(" ")[1]
    );
    res.status(204).json();
});

module.exports = router;
