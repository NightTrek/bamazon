# bamazon

Bamazon is a basic CRUD mysql2 implemantation which allows a customer to run the service and buy goods.
There is a primary asyncrounous interface which is run at launch which completes this flow.
program starts by retriving the items for sale from the sql database using promises.
than it displays a list of items
It uses Enquirer to get an array of items the users whats to buy along with an array of quantities for said items.
it validates the transactions and than
It than checks if there is enough inventory.
if there is it removes the items from the inventory and console logs a message for each item to tell if it worked or not.
If an item is not in inventory it will not be removed from 
After completion a list of items and weather they are successfully purchased or not should be printed.
The interface will than ask if you wish to buy more goods. if yes it will run the interface again recursivly or
it will end the program.

Pretty basic no thrills or fancy stuff just made it work.
5/10 difficulty 
6/10 usefullness
8/10 understanding
4/10 fun
