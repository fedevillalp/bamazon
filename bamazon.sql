DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT NOT NULL,
  quantity INT NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name,price,quantity)
VALUES ("monitor","electronics",250,30),("mouse","electronics",10,30),
("keyboard","electronics",10,30),("cord","electronics",5,30),("battery","electronics",50,30),
("router","electronics",25,30),("chair","furniture",140,30),("sofa","furniture",1200,30),
("pillow","furniture",50,30),("table","furniture",400,30),("bed","furniture",500,30);

