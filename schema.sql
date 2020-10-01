CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(department_id) REFERENCES departments(id)
);

CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    PRIMARY KEY(id),
    FOREIGN KEY(role_id) REFERENCES roles(id),
    FOREIGN KEY(manager_id) REFERENCES employees(id)
);

INSERT INTO departments (name)
    VALUES ("hr"), ("engineering"), ("finance");

INSERT INTO roles (title, salary, department_id)
    VALUES ("HR Manager", 70000, 1), ("software developer", 80000, 2), ("accountant", 90000, 3);