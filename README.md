![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)![PayPal](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

# Welcome to ToyShop! ✨
This project is based on a common stack of MERN(MongoDB, Expres, ReactJs, Node.js) to create a ecommerce experience web application.
It is not near perfect and is used to get some experience in all of these techonologies to develop efficent applications in the market. Some of the additional features would be adding in the pagination for the products, finishing the Admin side for the order. Being able to place an order with using the PayPal API properly. 

Live Demo: https://toyshopapp.herokuapp.com/
**Project Link** - ***https://toyshopapp.herokuapp.com/***

![screenshot](/frontend/public/images/homepage.png)

## Features and Functionalities 😃

**User features**

- Able to browse the current products in the database
- Add products into the cart go till the order 


**Admin features**

- Semi Admin Functionality 
- Product Management
- Order Management

## Installation Procedure:

**1. Clone this repo by running the following command :-**

```bash
 git clone https://github.com/Abhay2412/ToyShop
 cd ToyShop
```

**2. Now install all the required packages(frontend & backend) by running the following commands :-**

```
npm install
cd frontend
npm install
```

**2. Create a config.env file in config folder and add the following**

```
NODE_ENV = development
PORT = 5000
MONGO_URI = <your_mongodb_uri>
JWT_SECRET = <yoursecret>
PAYPAL_CLIENT_ID = <your_paypal_client_id>
```

**3. Now start the react and node server concurrently by running the following command :-**
```
#Start the application
npm run dev
```

**5.** **🎉 Open your browser and go to for and running the frontend on `https://localhost:3000`** 
**6.** **🎉 Open your browser and go to for and running the backend on `https://localhost:5000`** 