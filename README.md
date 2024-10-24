                                                                     #Full-Stack User Management System
Overview
This project is a full-stack web application that consists of a login page, registration page, and a home page that displays a list of users with options to read, edit, and delete user details. The frontend is built with React.js and Redux Toolkit for state management, while the backend is developed using Node.js, Express.js, and MySQL as the database.

# Features
User Registration
User Login
User Management (CRUD operations: Read, Update, Delete)



# Tech Stack
Frontend: React.js, Redux Toolkit, Axios
Backend: Node.js, Express.js
Database: MySQL

# Setup Instructions
Prerequisites
Node.js (v16 or above)
MySQL
Git 


<h3>Setup for client side react app </h3>
a. Clone the repository
   command: - git clone <repository-link>

b. goto client 
   @ command:- cd client 
   then goto userapp 
   @ command :- cd userapp

c.Install dependencies
  @ command :- npm install 

d.Run app
 @command:- npm start


<h3>Setup for Server </h3>

a. Navigate to the server folder
   @command: - cd ../server

b. Install server dependencies
  @command: - npm install 

<h3>Setting up MySQL Database</h3>

 a. @ command:- CREATE DATABASE nodedb2;
 b. Create the userinfo table:
    @command:-
    
CREATE TABLE userinfo (
   id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(20),
   email VARCHAR(20) NOT NULL UNIQUE,
   contactno int(10),
   password VARCHAR(30) NOT NULL,
   address VARCHAR(50),
);


<h1>Start the server </h1>

command: - npm start
  



