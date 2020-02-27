INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Jagger", 1, 101), ("Brian", "Jones", 2, 101), ("Keith", "Richards", 3, 101), ("Bill", "Wyman", 4, 101), ("Freddie", "Mercury", 11, 102);

INSERT INTO department (name)
VALUES ("Rolling Stones"), ("Queen");

INSERT INTO role (title, salary, department_id)
VALUES ("lead vocals", 420.000, 1), ("quitar", 420.000, 2), ("bass", 450.000, 2), ("drums", 450.000, 2);


select * from employee;
select * from department;
select * from role;