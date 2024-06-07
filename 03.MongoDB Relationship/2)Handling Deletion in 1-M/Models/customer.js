/* Handling Deletion using Mongoose Middleware in 1-M relationship:
        If we delete parent document, then that reference of child document saved in parent document is also to be deleted. 
    We can use 2 middleware
    1)Pre - run before the query is executed.
    2)Post - run after the query is executed. 
*/

/* Git Bash/Terminal :

    Sanket Aher@DESKTOP-7UDIT7I MINGW64 /e/learning/MongoDB Learn/03.MongoDB 1-M Relationship/Handling Deletion in 1-M
    $npm init -y
    Sanket Aher@DESKTOP-7UDIT7I MINGW64 /e/learning/MongoDB Learn/03.MongoDB 1-M Relationship/Handling Deletion in 1-M
    $npm i express
    Sanket Aher@DESKTOP-7UDIT7I MINGW64 /e/learning/MongoDB Learn/03.MongoDB 1-M Relationship/Handling Deletion in 1-M
    $npm i mongoose
    Sanket Aher@DESKTOP-7UDIT7I MINGW64 /e/learning/MongoDB Learn/03.MongoDB 1-M Relationship/Handling Deletion in 1-M
    $mkdir Models
    Sanket Aher@DESKTOP-7UDIT7I MINGW64 /e/learning/MongoDB Learn/03.MongoDB 1-M Relationship/Handling Deletion in 1-M
    $cd Models
    Sanket Aher@DESKTOP-7UDIT7I MINGW64 /e/learning/MongoDB Learn/03.MongoDB 1-M Relationship/Handling Deletion in 1-M/Models
    $touch customer.js

*/

const mongoose = require("mongoose");

// To connect with database
main()
.then(()=>console.log('connection sucessfully'))
.catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemoCustomer');
}

//i)Order Schema and Model (Child)
const orderSchema = new mongoose.Schema({
    item:String,
    price:Number
});

const Order = mongoose.model("Order",orderSchema);

//ii)Insert data into Order Collection
const addOrders = async () =>{
    await Order.insertMany([
        {item:"Somasa",price:12},
        {item:"Chips",price:10},
        {item:"Chocolate",price:40}
    ]);
    await addCustomer(); // after adding order data then calling addCustomer function for adding customer data  
}
//addOrders();

// iii)Customer Schema and Model (Parent)
const customerSchema = new mongoose.Schema({
    name:String,
    orders:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Order'                 // collection name that you want to refer as child
        }
    ]
});


/* Handling Deletion using Mongoose Middleware in 1-M relationship 
    If we delete particular customer(parent) document, then that reference of order(child) document saved in customer(parent) document is also to be deleted. 
*/
customerSchema.pre("findOneAndDelete",async() =>{
    console.log("PRE MIDDLEWARE");
});

customerSchema.post("findOneAndDelete",async(customerData) =>{
    console.log("POST MIDDLEWARE");
    if(customerData.orders.length){
        await Order.deleteMany({_id:{ $in: customerData.orders }})
    }
});

const Customer = mongoose.model("Customer",customerSchema);

//iv)Insert data into Customer Collection and put Order collection data into Customer Collection
const addCustomer = async()=>{
    let cust1 = new Customer({
        name:"Rahul Kumar"
    });

    let order1=await Order.findOne({item:"Chips"});
    let order2=await Order.findOne({item:"Chocolate"});

    cust1.orders.push(order1);
    cust1.orders.push(order2);

    await cust1.save();
}


//v) Delete Customer Data
const deleteCust = async ()=>{
    await Customer.findByIdAndDelete("665c63cfcf44caa14e2358b3"); // copy id from mongo shell 
}
deleteCust(); // it calls deletion middleware => line no 71 and 75


/* Git Bash/Terminal :

    Sanket Aher@DESKTOP-7UDIT7I MINGW64 /e/learning/MongoDB Learn/03.MongoDB 1-M Relationship/Handling Deletion in 1-M/Models
    $node customer.js
    PRE MIDDLEWARE
    connection sucessfully
    POST MIDDLEWARE
*/

/* MongoDB Shell:
    After Adding Order and Customer Data

    relationDemoCustomer> db.orders.find({})
    [
        {
            _id: ObjectId('665c63cfcf44caa14e2358ae'),
            item: 'Somasa',
            price: 12,
            __v: 0
        },
        {
            _id: ObjectId('665c63cfcf44caa14e2358af'),
            item: 'Chips',
            price: 10,
            __v: 0
        },
        {
            _id: ObjectId('665c63cfcf44caa14e2358b0'),
            item: 'Chocolate',
            price: 40,
            __v: 0
        }
    ]

    relationDemoCustomer> db.customers.find({})
    [
        {
            _id: ObjectId('665c63cfcf44caa14e2358b3'),
            name: 'Rahul Kumar',
            orders: [
            ObjectId('665c63cfcf44caa14e2358af'),
            ObjectId('665c63cfcf44caa14e2358b0')
            ],
            __v: 0
        }
    ]

*/

/* MongoDB Shell:
    After Deleting Customer Data

    relationDemoCustomer> db.orders.find({})
    [
        {
            _id: ObjectId('665c63cfcf44caa14e2358ae'),
            item: 'Somasa',
            price: 12,
            __v: 0
        }
    ]

    relationDemoCustomer> db.customers.find({})
    

*/

