const express = require('express');

var app = express();

const bodyParser = require('body-parser');

const mysql = require('mysql');

const { json } = require('express/lib/response');

app.use(bodyParser.json());

// connection configurations
var DBConnection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '7798953906',
database: 'sample'
});

// connect to database
DBConnection.connect((err)=>{
   
    if(!err)
    console.log("connected")
    else
    console.log('not connected :'+json.stringify(err,undefined,2));
    
}); 

// Add product with some details. Each product shall belong to a category.
    
app.post('/products', function (req, res) {
    let data ={ product_i:req.body.product_i,product_name:req.body.product_name,category_id:req.body.category_id,description:req.body.description};
      let sqlQuery = "INSERT INTO PRODUCT SET ?";

       let query = DBConnection.query(sqlQuery, data,(err, results) => {

          if(!err)
          console.log('inserted successfully');
          else
        console.log(err);
      });
            
     });


// Get list of products sorted by name, category and/or price


app.get('/products', function (req, res) {

    DBConnection.query('select * from product order by product_name,category_id asc',(err,rows,fields)=>{

    if(!err)
    console.log(rows);
    else
  console.log(err);
});

});

// Add users/customers

app.post('/user_details', function (req, res) {
    let data ={ user_id:req.body.user_id,user_name:req.body.user_name,mobile_no:req.body.mobile_no,email:req.body.email,city:req.body.email,pin:req.body.pin};
    let sqlQuery = "INSERT INTO user_Details SET ?";
      
    let query = DBConnection.query(sqlQuery, data,(err, results) => {
     
                 if(!err)
                 console.log('inserted successfully');
                 else
               console.log(err);
             });
                   
            });

//Add products to cart for a customer

app.post('/cart', function (req, res) {
           let data ={ cart_id:req.body.cart_id,user_id:req.body.user_id,product_id:req.body.product_id,quantity:req.body.quantity,total_price:req.body.total_price};
               let sqlQuery = "INSERT into cart SET ?";
                          
            let query = DBConnection.query(sqlQuery, data,(err, results) => {
                         
                  if(!err)
               console.log('inserted successfully');
                  else
                console.log(err);
               });
                                       
           });


// Add product in wishlist for a customer

app.post('/wishlist', function (req, res) {
            let data ={ wishlist_id:req.body.wishlist_id,product_id:req.body.product_id,user_id:req.body.user_id,visible:req.body.visible};
            let sqlQuery = "INSERT INTO wishlist SET ?";
              
            let query = DBConnection.query(sqlQuery, data,(err, results) => {
             
             if(!err)
             console.log('inserted successfully');
             else
             console.log(err);
           });
        });

 //  Add orders for customers

        app.post('/orders', function (req, res) {
            let data ={ order_id:req.body.order_id,cart_id:req.body.cart_id,payment_mode:req.body.payment_mode,COD:req.body.COD};
            let sqlQuery = "INSERT INTO ORDER_DETAILS SET ?";
              
            let query = DBConnection.query(sqlQuery, data,(err, results) => {
             
                         if(!err)
                         console.log('inserted successfully');
                         else
                       console.log(err);
                     });
                           
                    });    


// Update details of a product  

    app.put('/product/:product_i', function (req, res) {

        DBConnection.query('update product set description=? where product_i=?',[req.body.description,req.params.product_i],(err,rows,fields)=>{
                
                    if(!err)
                    console.log('updated successfully');
                    else
                  console.log(err);
                });
                
                });

  //  Delete a particular product

app.delete('/products/:product_name', function (req, res) {

    DBConnection.query('delete from product where product_name=?',[req.params.product_name],(err,rows,fields)=>{
    
        if(!err)
        console.log('deleted successfully');
        else
      console.log(err);
    });
    
    });


 // Retrieve product with product_id 

app.get('/products/:id', function (req, res) {

    DBConnection.query('select * from product where product_i=?',[req.params.id],(err,rows,fields)=>{
    
        if(!err)
        console.log(rows);
        else
      console.log(err);
    });
    
    });
                         
            
// set port
app.listen(3001, function () {
console.log(' Node app is running on port 3001');
});
module.exports = app;