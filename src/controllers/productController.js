const router = require("express").Router();
const { dbConn } = require("../db-connect");

router.post('/addProduct', (req, res) => {
    try {
        const { name, price, details, image, cash_on_delivery, deliver_in, quantity, category, discount, } = req.body;

        // Validate input
        if (!name || !price || !details || !image || !cash_on_delivery || !deliver_in || !quantity || !category) {
            return res.status(400).json({ 
                status: false,
                error: 'All fields are required' 
            });
        }

        const sql = `INSERT INTO product_list( name, price, details, image, cash_on_delivery, deliver_in, quantity, category, discount ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ? )`;
        
        dbConn.query(sql, [name, price, details, image, cash_on_delivery, deliver_in, quantity, category, discount ], (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).json({ 
                    status: false,
                    error: 'An error occurred while adding the product' 
                });
            }

            if (!result || !result.insertId) {
                // Unexpected situation if insertId is not returned
                console.error('Insert ID not returned:', result);
                return res.status(500).json({
                    status: false,
                    error: 'Failed to add product. Please try again.'
                });
            }

            res.status(201).json({ 
                status: true,
                message: 'Product added successfully', 
                productId: result.insertId 
            });
        });
    } catch (exception) {
        console.error('Exception caught in /addProduct:', exception);
        res.status(500).json({
            status: false,
            error: 'Something went wrong. Please try again later.'
        });
    }
});

router.get("/allProduct", (request, response) => {
    try {
        const sql = `SELECT * FROM product_list`;

        dbConn.query(sql, (err, result) => {
            if (err) {
                // Log the error and send a response with an appropriate message
                console.error('Error executing query:', err);
                return response.status(500).json({
                    status: false,
                    error: 'An error occurred while fetching products.'
                });
            }

            if (result && result.length > 0) {
                return response.status(200).json({
                    status: true,
                    products: result
                });
            } else {
                return response.status(404).json({
                    status: false,
                    message: 'No products found.'
                });
            }
        });
    } catch (exception) {
        // Catch any other unexpected errors
        console.error('Exception caught in /allProduct:', exception);
        response.status(500).json({
            status: false,
            error: 'Something went wrong. Please try again later.'
        });
    }
});



router.get("/productByProductId/:id", (request, response) => {
    const { id } = request.params;

    try {
        if (!id) {
            return response.status(400).json({
                status: false,
                message: "Product ID is required."
            });
        }


        const sql = `SELECT * FROM product_list WHERE product_id = ${id};`;

        dbConn.query(sql, (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                return response.status(500).json({
                    status: false,
                    message: "An error occurred while fetching product."
                });
            }

            if (result && result.length > 0) {
                return response.status(200).json({
                    status: true,
                    product: result[0] // Send the first product as response
                });
            }

            return response.status(404).json({
                status: false,
                message: "Product not found."
            });
        });
    } catch (exception) {
        console.error('Exception caught in /productByProductId:', exception);
        return response.status(500).json({
            status: false,
            message: "Something went wrong. Please try again later."
        });
    }
});




module.exports = router;