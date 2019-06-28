//launch enquirer 
//display items for sale
//ask them item ID of product they want to buy
//ask them how many
//if there is enough item quanitity 
//show the total cost of their purchases.
//remove inventory
const E = require('enquirer');
const mysql = require("mysql2/promise");

const getConnection = async function () {
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

const ItemCon = function(id, name ){
    
}

const displayItemsForSale = async function (con) {
    try {
        const response = await con.query(`SELECT * FROM products`);
        let ItemArray = [];
        // console.log('----------------------------------------------')
         for (key in response[0]) {
            // console.log(`id: ${response[0][key].item_id} || Product Name: ${response[0][key].product_name} || Department: ${response[0][key].department} || Price: ${response[0][key].price} ||`) 
            // console.log('------------------------------------------------------------------------------------')
            ItemArray.push(`id: ${response[0][key].item_id} || Product Name: ${response[0][key].product_name} || Department: ${response[0][key].department} || Price: ${response[0][key].price} ||`);
        }

        try{
            console.log(ItemArray)
            let response = await E
        .prompt([
            // Here we create a basic text prompt.
            {
                type: "list",
                message: "Which product do you want to buy",
                choices: ItemArray,
                name: "product" 
            },
            // Here we create a basic password-protected text prompt.
            {
                type: "input",
                message: "Command Options or search term?",
                name: "options"
            }
        ])// end of await


        console.log(response)
        }
        catch(err){
            console.log(err)
        }
    }
    catch(err){
        throw err;
    }
}//i wonder

const interfaceStart = async function () {
    const Connect = await getConnection();
    displayItemsForSale(Connect)




    
    

}

interfaceStart();