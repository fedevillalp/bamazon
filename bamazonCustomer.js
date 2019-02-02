var mysql = require("mysql");
//const cTable = require('console.table');
var inquirer = require("inquirer");


var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon"
});


connection.connect(function(err) {
    
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start();

});

function start(){

  console.clear();
  console.log('Welcome here is the product catalog: ')
  readAllProducts(ask);  

  function ask(){
    inquirer
      .prompt([
        {
          name: "product_id",
          type: "input",
          message: "What is the ID of the item would you like to buy ?"
        },
        {
          name: "quantity",
          type: "input",
          message: "How many do you want ? "
        }
      ])
      .then(function(answer) {
        buy2(answer.product_id,answer.quantity);
      });
  }


}

function continueShopping(){
  
    inquirer
      .prompt([
        {
          name: "continue",
          type: "rawlist",
          choices: ['yes', 'no'],
          message: "Do you want to coninue shopping ?"
        }
      ])
      .then(function(answer) {
        
        if (answer.continue ==='yes'){
          start();
        } else if (answer.continue ==='no'){
          console.log('Thank you ! Good bye! ');
          connection.end();
        };

      });
  
}


function readAllProducts(callback) {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.table(res);
      callback();
    });
}


function updateProduct(id,quantity) {
    //console.log("This is upadteProduct...\n");
    connection.query(
      "UPDATE products SET ? WHERE ?",
      [
        {
          quantity: quantity
        },
        {
          id: id
        }
      ],
      function(err, res) {
        //console.log(res.affectedRows + " products updated!\n");
      }
    );
}

function readOneProductbyID(id , callback ) {
    //console.log("This is readOne Product...\n");
    connection.query(
      "SELECT * FROM products WHERE ?",
      [
        {
            id: id
        }
      ]
      ,
      function(err, res) {
        if (err) throw err;
        callback(res)
      }
    );
    //connection.end();
}

function buy(id,units_to_buy,stock,product_name,price){
    if(stock >= units_to_buy){
        stock = stock - units_to_buy
        updateProduct(id,stock);
        console.log('You bought ' + units_to_buy + ' ' + product_name + '(s)');
        console.log('Your Total: $' + units_to_buy*price);
        continueShopping();
    } else if (stock < units_to_buy){
        console.log('Sorry. We are out of stock!');
        continueShopping();
    }
};

function buy2(id, units_to_buy){
  
  //lookup price and quantity
  readOneProductbyID(id, function callback (res){     
    //Update purchase in Database
    buy(res[0].id, units_to_buy, res[0].quantity , res[0].product_name, res[0].price); 
    
  }); 

}

  
