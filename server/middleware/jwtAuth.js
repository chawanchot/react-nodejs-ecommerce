const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json();
    }
    jwt.verify(
        token.split(" ")[1],
        process.env.SECRET_KEY,
        function (err, decoded) {
            if (err) {
                return res
                    .status(403)
                    .json({
                        status: "error",
                        errors: `${err.name} : ${err.message}`,
                    });
            }
            req.auth = decoded;
            return next();
        }
    );
};

module.exports = verifyToken;