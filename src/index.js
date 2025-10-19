const express = require("express");
const { dbConn } = require("./db-connect");
const authentication = require("./controllers/authentication");
const productController = require("./controllers/productController");

const app = express();
app.use(express.json());


// const PORT = 4001;
const port = process.env.PORT || 3000;


app.use("/authentication", authentication);
app.use("/product", productController);

app.post("/loginGetInfo", (request, response)=>{
    const {email, password} = request.body;
    if(email && password){
        const sql = `SELECT ld.id, ld.email, ud.name FROM login_detail ld LEFT JOIN user_detail ud ON ld.id = ud.user_id WHERE ld.email = '${email}' AND ld.password = MD5('${password}') AND ld.active = 'Y';`
        dbConn.query(sql, (err, result)=>{
            if(err) console.log(err);
            if(result){
                return response.status(200).json({status:true, message:"successfully", data: result[0]});
            }
            return response.status(500).json({status:false, message: "Someting went wrong"});
        });
        return;
    }
    return response.status(500).json({status:false, message: "All fields are required."});
});

app.get("/getUserDetailByUserId/:id", (request,response)=>{
    const {id} = request.params;
    if(id){
        const sql = `SELECT name,contact_no, address FROM user_detail WHERE user_id = ${id};`;
        dbConn.query(sql, (err, result)=>{
            if(err) console.log(err);
            if(result){
                return response.status(200).json(result[0]);
            }
            return response.status(500).json({});
        });
        return;
    }
    return response.status(500).json({status:false, message: "All fields are required."});
});

  


// Route to add a product to the cart
app.post('/add-to-cart', (req, res) => {
    const { user_id, product_id, quantity } = req.body;
  
    if (!user_id || !product_id || !quantity) {
      return res.status(400).send({ message: 'Missing required fields' });
    }
  
    const query = `INSERT INTO user_product_map (user_id, product_id, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity);`;
  
    dbConn.query(query, [user_id, product_id, quantity], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).send({ message: 'Internal Server Error' });
      }
      return res.status(200).send({ message: 'Product added to cart successfully', results });
    });
  });

  app.listen(port, () => console.log(`Server listening on port ${port}`));

// app.listen(PORT, ()=> console.log(`server listen on ${PORT}`));










// {
//   "name": "test-api",
//   "version": "1.0.0",
//   "main": "index.js",
//   "scripts": {
//     "test": "echo \"Error: no test specified\" && exit 1",
//     "start": "nodemon ./src/index.js"
//   },
//   "author": "Vikash",
//   "license": "ISC",
//   "description": "",
//   "dependencies": {
//     "express": "^4.21.2",
//     "mysql": "^2.18.1",
//     "swagger-jsdoc": "^6.2.8",
//     "swagger-ui-express": "^5.0.1"
//   },
//   "devDependencies": {
//     "nodemon": "^3.1.9"
//   }
// }
