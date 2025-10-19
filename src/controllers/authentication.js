
const router = require("express").Router();
const { dbConn } = require("../db-connect");

router.post("/register", (request, response) => {
    try {
        const { name, email, password, contact_no, dob, gender } = request.body;

        // Step 1: Input validation
        if (!name || !email || !password) {
            return response.status(400).json({
                status: false,
                message: "Name, email, and password are required.",
            });
        }

        // Step 2: Check if email already exists
        const checkSql = `SELECT email FROM login_detail WHERE email = ?`;
        dbConn.query(checkSql, [email], (checkErr, checkResult) => {
            if (checkErr) {
                console.error("Email check error:", checkErr);
                return response.status(500).json({
                    status: false,
                    message: "Internal server error while checking email.",
                });
            }

            if (checkResult.length > 0) {
                return response.status(409).json({
                    status: false,
                    message: "Email already registered.",
                });
            }

            // Step 3: Insert into login_detail
            const sql1 = `INSERT INTO login_detail(email, password) VALUES (?, MD5(?))`;
            dbConn.query(sql1, [email, password], (err, result) => {
                if (err) {
                    console.error("Login insert error:", err);
                    return response.status(500).json({
                        status: false,
                        message: "Internal server error while creating login.",
                    });
                }

                if (!result || !result.insertId) {
                    return response.status(500).json({
                        status: false,
                        message: "Failed to create login entry.",
                    });
                }

                const userId = result.insertId;

                // Step 4: Insert into user_detail
                const sql2 = `
                    INSERT INTO user_detail(user_id, name, email, contact_no, dob, gender, password)
                    VALUES (?, ?, ?, ?, ?, ?, MD5(?))
                `;
                dbConn.query(sql2, [userId, name, email, contact_no, dob, gender, password], (err2, result2) => {
                    if (err2) {
                        console.error("User insert error:", err2);
                        return response.status(500).json({
                            status: false,
                            message: "Internal server error while saving user data.",
                        });
                    }

                    return response.status(200).json({
                        status: true,
                        message: "Student registered successfully.",
                    });
                });
            });
        });
    } catch (exception) {
        console.error("Exception in register route:", exception);
        return response.status(500).json({
            status: false,
            message: "Something went wrong. Please try again later.",
        });
    }
});




router.post("/login", (request, response) => {
    try {
        const { email, password } = request.body;

        // Check if both fields are provided
        if (!email || !password) {
            return response.status(400).json({
                status: false,
                message: "All fields are required.",
            });
        }

        const sql = `SELECT COUNT(*) AS row_count FROM login_detail WHERE email = '${email}' AND password =  MD5('${password}');`;

        dbConn.query(sql, (err, result) => {
            if (err) {
                console.error("Database error during login:", err);
                return response.status(500).json({
                    status: false,
                    message: "Internal server error. Please try again later.",
                });
            }

            if (result && result.length > 0) {
                const count = result[0].row_count;

                if (count > 0) {
                    return response.status(200).json({
                        status: true,
                        message: "Login successful.",
                    });
                } else {
                    return response.status(401).json({
                        status: false,
                        message: "Invalid email or password.",
                    });
                }
            } else {
                return response.status(500).json({
                    status: false,
                    message: "Unexpected error. No result returned.",
                });
            }
        });
    } catch (exception) {
        console.error("Exception during login:", exception);
        return response.status(500).json({
            status: false,
            message: "Something went wrong. Please try again.",
        });
    }
});



module.exports = router;