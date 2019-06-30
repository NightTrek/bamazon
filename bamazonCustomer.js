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
        const response = await con.query(`SELECT * FROM products`);

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

const CheckIfOrderIsValid = async function(con, order, itemArray){
    for(key in order){
        if(isValidItem(order[key], itemArray)){

        }
    }
}

const isValidItem = function(item, itemArray){
    for(let i =0;i<itemArray.length;i++){
    if(item.ID === ItemArray[i].id){
        return true;
    }
}
return false;

}

const interfaceStart = async function () {
    const con = await GetConnection()
    const ItemArray = await DisplayItemsForSale(con)
    const customerOrder = await getCustomerOrder();
    console.log(customerOrder);
   
    
  
}

interfaceStart();

