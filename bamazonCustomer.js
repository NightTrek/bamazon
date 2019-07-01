//launch enquirer 
//display items for sale
//ask them item ID of product they want to buy
//ask them how many
//if there is enough item quanitity 
//show the total cost of their purchases.
//remove inventory
const E = require('enquirer');
const mysql = require("mysql2/promise");


const GetConnection = async function(){
try{
    return mysql.createConnection({
        host: "localhost",

        // Your port; if not 3306
        port: 3306,

        // Your username
        user: "root",

        // Your password
        password: "password",
        database: "bamazon_db"
    });
}
catch(err){
 throw err;
}

}

const DisplayItemsForSale = async function(con){
    try{
        let response = await con.query(`SELECT * FROM products`);

        return new Promise((resolve, reject) => {
            if(response) {
                let ItemArray = [];
                for (key in response[0]) {
                    console.log(`id: ${response[0][key].item_id} || Product Name: ${response[0][key].product_name} || Department: ${response[0][key].department} || Price: ${response[0][key].price} || quantity: ${response[0][key].quantity}`) 
                    console.log('------------------------------------------------------------------------------------')
                    ItemArray.push({id:response[0][key].item_id,Product_name:response[0][key].product_name, Department:response[0][key].department, price:response[0][key].price, quantity:response[0][key].quantity});
                }
               resolve(ItemArray); 
            } else {
               const errorObject = {
                  msg: 'An error occured displaying items',
                  error, //...some error we got back
               }
               reject(errorObject);
            }
         });
    }
    catch(err){
        throw err;
    }
}

const getCustomerOrder = async function(){
    try{
    let response = await E
    .prompt([
        // Here we create a basic text prompt.
        {
            type: "input",
            message: "List the Item ID's you wish you order seperated by comas",
            name: "product" 
        },
        // Here we create a basic password-protected text prompt.
        {
            type: "input",
            message: "List the ammounts seperated by comas?",
            name: "Amounts"
        }
        
]);// end of await
return new Promise((resolve, reject) => {
    if(response) {
        let output = [];
        let idArray = response.product.split(',');
        let amountArray = response.Amounts.split(',');
        if(idArray.length === amountArray.length){
            for(let i =0; i<idArray.length;i++){
                output.push({
                    ID:idArray[i],
                    amount:amountArray[i]
                });
            }
        }
       resolve(output); 
    } else {
       const errorObject = {
          msg: 'An error occured displaying items',
          error, //...some error we got back
       }
       reject(errorObject);
    }
 });
    }
    catch(err){
        throw err;
    }
}

const CheckIfOrderIsValid = async function(orders, itemArray){
    for(key in orders){
        if(isValidItem(orders[key], itemArray) !== true){
            return false;
        }
    }
    return true;
}
const isValidItem = function(item, itemArray){
    for(let i =0;i<itemArray.length;i++){
    if(item.ID === itemArray[i].id){
        return true;
    }
}
return false;

}

 const checkForInventory = async function(con, order){
    try{
        let response = await con.query(`SELECT * FROM products WHERE item_id = "${order.ID}"`);
        return new Promise((resolve, reject) => {
            if(response) {
                console.log("inventory response")
                

               resolve(response[0]); 
            } else {
               const errorObject = {
                  msg: 'An error occured displaying items',
                  error, //...some error we got back
               }
               reject(errorObject);
            }
         });
    }
    catch(err){
        console.log("checkforINventory failed")
        throw err;
    }
 }

 const UpdateInventory = async function(con, id, newInventory){
     try{
     let response = await con.query("UPDATE products SET ? WHERE ?",
     [
       {
         quantity: newInventory
       },
       {
        item_id: id
       }
     ]);

     return new Promise((resolve, reject) => {
        if(response) {
            console.log("inventory updated")
           resolve(response[0]); 
        } else {
           const errorObject = {
              msg: 'An error occured displaying items',
              error, //...some error we got back
           }
           reject(errorObject);
        }
     });

    }
    catch(err){
        throw err;
    }
 }

const interfaceStart = async function () {
    const con = await GetConnection()
    const ItemArray = await DisplayItemsForSale(con)
    const customerOrder = await getCustomerOrder();
    console.log(customerOrder);
    if(CheckIfOrderIsValid(customerOrder, ItemArray)){
        for(key in customerOrder){
            let transaction = await checkForInventory(con,customerOrder[key]);
            console.log(transaction)
            if(transaction[0].quantity >= customerOrder[key].amount){
                console.log("successfull transaction");
            }
            else{
                console.log("insuficent inventory to complete transaction")
            }
        }
    }
    else{
        customerOrder["msg"] = "Not valid transaction item ID is not an item"
    }
    
    
   
    
  
}

interfaceStart();

