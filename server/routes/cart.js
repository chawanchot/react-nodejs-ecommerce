const express = require("express");
const router = express.Router();
const conn = require("../config/database");
const jwtAuth = require("../middleware/jwtAuth");

router.post("/", jwtAuth, async (req, res) => {
    const { cartData } = req.body;
    const getData = (p_id, q_id) =>
        new Promise((resolve, reject) => {
            conn.execute(
                "SELECT product.name AS name, product.price AS price, product.discount_percent, product.img, product_quantity.quantity, product_quantity.size, product_quantity.color FROM product INNER JOIN product_quantity ON product_quantity.product_id = product.id AND product_quantity.id = ? WHERE product.id = ?",
                [q_id, p_id],
                function (err, result, field) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result[0]);
                    }
                }
            );
        });

    let responseData = [];

    await Promise.all(
        cartData.map((item) =>
            getData(item.itemId, item.quantityId)
                .then((data) => {
                    data.cartQuantity = item.quantity;
                    data.instock = data.quantity - item.quantity >= 1 ? true : false;
                    responseData.push(data);
                })
                .catch((err) => console.log(err))
        )
    );

    res.status(200).json({ status: "success", data: responseData });
});

module.exports = router;
