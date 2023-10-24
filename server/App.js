const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Routes
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const cartRouter = require("./routes/cart");
const shopRouter = require("./routes/shop");
const wishlistRouter = require("./routes/wishlist");

app.use("/", shopRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/cart", cartRouter);
app.use("/wishlist", wishlistRouter);

app.get("/", (req, res) => {
    res.status(200).json({ "message": "Hello, World!" });
})

app.listen(port, () => {
    console.log(`Started listening on port ${port}`);
})