
-- Department Seeds
INSERT INTO departments (name) values ("Human Resources");
INSERT INTO departments (name) values ("Toys");
INSERT INTO departments (name) values ("BOH");
INSERT INTO departments (name) values ("Shoes");
INSERT INTO departments (name) values ("Home Goods");
INSERT INTO departments (name) values ("Food");
INSERT INTO departments (name) values ("Automotive");
INSERT INTO departments (name) values ("Bakery");
INSERT INTO departments (name) values ("Deli");

-- Role Seeds
INSERT INTO `role` (title, salary, department_id) values ("HR Manager", 75000, 5);
INSERT INTO `role` (title, salary, department_id) values ("Toy Sales", 30000, 6);
INSERT INTO `role` (title, salary, department_id) values ("Loss Prevention Specialist", 60000, 7);
INSERT INTO `role` (title, salary, department_id) values ("Shoe Sales", 40000, 8);
INSERT INTO `role` (title, salary, department_id) values ("Home Goods Sales", 30000, 9);
INSERT INTO `role` (title, salary, department_id) values ("Visual", 30000, 9);
INSERT INTO `role` (title, salary, department_id) values ("Checker", 30000, 10);
INSERT INTO `role` (title, salary, department_id) values ("Baker", 30000, 12);
INSERT INTO `role` (title, salary, department_id) values ("Butcher", 30000, 13);

UPDATE `role`
SET salary = 45000
WHERE title = "Visual";

UPDATE `role`
SET salary = 25000
WHERE title = "Checker";

UPDATE `role`
SET salary = 40000
WHERE title = "Baker";

UPDATE `role`
SET salary = 42000
WHERE title = "Butcher";

UPDATE `role`
SET title = "HR Manager"
WHERE id = 2;