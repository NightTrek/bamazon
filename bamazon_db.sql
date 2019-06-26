DROP DATABASE IF EXISTS bamazon_db;
CREATE database bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department VARCHAR(100) NULL,
  price DECIMAL NOT NULL,
  quantity INTEGER(10) NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department, price, quantity)
VALUES("Sun Glasses", "appearel", 10.99, 42),
("Hat", "appearel", 14.99, 31),
("boots", "appearel", 99.99, 68),
("jeans", "appearel", 60.99, 42),
("GTX3090", "computer", 2099.99, 42),
("linuxLaptop", "computer", 10.99, 42),
("intelQuantum", "computer", 10000.99, 1),
("Razer Blade", "computer", 2499.99, 12),
("ASIC Miner", "computer", 420.99, 10);

SELECT * FROM products;
