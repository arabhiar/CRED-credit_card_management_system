# CRED-T8
Team ID: CRED-T8 | Team Members: Narendra Manglani &amp; Abhishek Ranjan

---

## Table of Contents

- [Objective](#objective)
- [Introduction](#introduction)
- [Demo](#demo)
- [Features](#features)
- [Built With(Tech Stack)](#built-with)
- [How to Get Started](#how-to-get-started)
- [Deployed Links](#deployed-links)
- [Developed By](#developed-by)

---

### Objective

Build a Credit Card Management system (web application) which can handle the entire lifecycle of a customer’s credit card. Functionality like adding and verifying credit card(s), fetching the credit card statement to generate a summary and extract insights and making payments for the card. The system should have a UI which gives the customers a clean interface to use.

---

### Introduction

As an externship program we had provided a project to make a Credit Card Management System similar to CRED. We successfully build the web application as well as android application. 

---

### Demo

Below is a demo of final project.

![](./assets/demo.gif)

---

### Features

- User can login and register using email and password.
- User can add their credit card.

---

### Built With

- [ReactJS](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Redux](https://redux.js.org/) - A Predictable State Container for Javascript Apps
- [React-Bootstrap](https://react-bootstrap.github.io/) - Wrapper for bootstrap in ReactJS
- [NodeJS](https://nodejs.org/) - It is a JavaScript runtime built on Chrome's V8 JavaScript engine.


- [ExpressJS](https://expressjs.com/) - It is designed for building web applications and APIs.
- [MySQL](https://www.mysql.com/) - A relational database management system to store data.
- [Sequelize](https://sequelize.org/) - It is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server.

---

### How To Get Started

1. Clone the repository

2. ``` cd backend ``` and create a folder named ```config```. Inside that folder make a file named ``` config.json ```

3. Content of ``` config.json ``` should be similar to this.
> Note: We are using mysql as a dialect(for storing data). You can use any dialect like Postgress, MariaDB, SQLite and Microsoft SQL Server. But you have to change ```config.json``` accordingly.

```json
{
    "development": {
      "username": "<db_user>",
      "password": "<password>",
      "database": "cred_dev",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "test": {
      "username": "<db_user>",
      "password": "<password>",,
      "database": "cred_test",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "production": {
      "username": "<db_user>",
      "password": "<password>",
      "database": "cred_prod",
      "host": "127.0.0.1",
      "dialect": "mysql"
    }
  }
```
4. In ``` backend ``` directory create a file named ``` .env ```

5. Content of ``` .env ``` should be similar to this

```
PORT=5000
SECRET=<YOUR_SECRET_KEY>
ENCRYPTION_KEY=<YOUR_ENCRYPTION_KEY>
TWILIO_ACCOUNT_SID=<TWILIO_ACCOUNT_SID>
TWILIO_AUTH_TOKEN=<TWILIO_AUTH_TOKEN>
TWILIO_PHONE_NO=<TWILIO_PHONE_NO>
EMAIL=<AN_EMAIl_ID>
EMAIL_PAS=<EMAIL_PASSWORD>
```

6. In ```backend``` directory run ``` npm install ```.

7. ``` cd frontend ``` and create a file named ``` .env ```.

8. Content of ``` .env ``` should be similar to this.
```
REACT_APP_BACKEND_URL_DEV=http://localhost:5000/
REACT_APP_BACKEND_URL_PROD=<BACKEND_DEPLOYED_URL>
```

9. In ``` frontend ``` directory run ``` npm install ```

10. ``` cd backend ``` and exectute following command
```
npm run dev - to run server and client concurrently
npm run server - to run server standalone
npm run client - to run client standalone.
```

---

### Deployed Links

- Web Application
    - [Link](https://cred-t8.netlify.app/)
- Android APK
    - [Link](https://drive.google.com/file/d/1oxP7BQGEgGeFnLBS8aiM3V_DLA0UQnCK/view?usp=sharing)

---

### Developed By

 - [Abhishek Ranjan](https://www.github.com/arabhiar)
 - [Narendra Manglani](https://github.com/ishuu7)