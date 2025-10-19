const mysql = require("mysql");
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'siwan_grocery_hub'
  });
connection.connect();

module.exports = {dbConn : connection}

// SELECT pl.product_id, pl.product_name, pl.product_price, pl.product_details FROM user_product_map upm JOIN product_list pl ON upm.product_id = pl.product_id  WHERE user_id = 3;
