const express = require("express");
const router = express.Router();
const conn = require("../config/database");

router.get("/products/shop/:category", (req, res) => {
    const { category } = req.params;
    conn.execute("SELECT * FROM product WHERE category_id = (SELECT id FROM category WHERE name = ?)", [category], function(err, resultProduct, field) {
        if (err) {
            res.status(400).json({ status: "error", message: err });
            return;
        }
        conn.execute("SELECT brand.name, category.name AS category FROM brand INNER JOIN category ON brand.category_id = category.id WHERE brand.category_id = (SELECT id FROM category WHERE name = ?)", [category], function(err, resultBrand, field) {
            if (err) {
                res.status(400).json({ status: "error", message: err });
                return;
            }
            res.status(200).json({ status: "success", data: { product: resultProduct, brand: resultBrand } });
        });
    });
});

router.get("/products/shop/:category/:brand", (req, res) => {
    const { category, brand } = req.params;
    conn.execute("SELECT * FROM product WHERE category_id = (SELECT id FROM category WHERE name = ?) AND brand_id = (SELECT id FROM brand WHERE name = ?)", [category, brand], function(err, resultProduct, field) {
        if (err) {
            res.status(400).json({ status: "error", message: err });
            return;
        }
        if (resultProduct.length < 1) {
            res.status(400).json({ status: "error", message: "No data" });
            return;
        }
        conn.execute("SELECT brand.name, category.name AS category FROM brand INNER JOIN category ON category.id = brand.category_id WHERE category_id = (SELECT id FROM category WHERE name = ?)", [category], function(err, resultBrand, field) {
            if (err) {
                res.status(400).json({ status: "error", message: err });
                return;
            }
            if (resultBrand.length < 1) {
                res.status(400).json({ status: "error", message: "No data" });
                return;
            }
            res.status(200).json({ status: "success", data: { product: resultProduct, brand: resultBrand } });
        });
    })
});

router.get("/product/:id", (req, res) => {
    const { id } = req.params;
    conn.execute("SELECT product.*, category.name AS category, brand.name AS brand FROM product INNER JOIN category ON product.category_id = category.id INNER JOIN brand ON product.brand_id = brand.id WHERE product.id = ?", [ id ], function(err, result, field) {
        if (err) {
            res.status(500).json({ status: "error", message: err });
            return;
        };
        if (result.length < 1) {
            res.status(400).json({ status: "error", message: "No data" });
            return;
        };
        conn.execute("SELECT * FROM product_quantity WHERE product_id = ?", [ id ], function(err, quantityResult, field) {
            if (err) {
                res.status(500).json({ status: "error", message: err });
                return;
            };
            if (result.length < 1) {
                res.status(400).json({ status: "error", message: "No data" });
                return;
            };
            res.status(200).json({ status: "success", data: result, quantity: quantityResult });
        })
    })
})

router.get("/products/new", (req, res) => {
    conn.execute("SELECT * FROM product", function(err, result, field) {
        if (err) {
            res.status(400).json({ status: "error", message: err });
            return;
        }
        if (result.length < 1) {
            res.status(400).json({ status: "error", message: "No data" });
            return;
        }
        res.status(200).json({ status: "success", data: result });
    })
})

router.get("/category", (req, res) => {
    conn.execute("SELECT * FROM category", function(err, result, field) {
        if (err) {
            res.status(400).json({ status: "error", message: err });
            return;
        }
        if (result.length < 1) {
            res.status(400).json({ status: "error", message: "No data" });
            return;
        }
        res.status(200).json({ status: "success", data: result });
    })
});

module.exports = router;