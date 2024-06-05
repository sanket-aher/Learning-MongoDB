/* Approach2 : One to Many
        Store a reference to the child document inside parent document
*/

/* Layout of parent document :
    
    {
        _id:ObjectId("665afdac11ca2e15b3256ff4"),
        name:'Rahul Kumar',
        orders:[
            ObjectId("665afc10800bc1e9d6b59f89"),
            ObjectId("665afc10800bc1e9d6b59f8a")
        ],
        __v:0
    }

*/

/* Git Bash/Terminal :

    Sanket Aher@DESKTOP-7UDIT7I MINGW64 /e/learning/MongoDB Learn/03.MongoDB 1-M Relationship/Approach2(One to Many)
    $npm init -y
    Sanket Aher@DESKTOP-7UDIT7I MINGW64 /e/learning/MongoDB Learn/03.MongoDB 1-M Relationship/Approach2(One to Many)
    $npm i express
    Sanket Aher@DESKTOP-7UDIT7I MINGW64 /e/learning/MongoDB Learn/03.MongoDB 1-M Relationship/Approach2(One to Many)
    $npm i mongoose
    Sanket Aher@DESKTOP-7UDIT7I MINGW64 /e/learning/MongoDB Learn/03.MongoDB 1-M Relationship/Approach2(One to Many)
    $mkdir Models
    Sanket Aher@DESKTOP-7UDIT7I MINGW64 /e/learning/MongoDB Learn/03.MongoDB 1-M Relationship/Approach2(One to Many)
    $cd Models
    Sanket Aher@DESKTOP-7UDIT7I MINGW64 /e/learning/MongoDB Learn/03.MongoDB 1-M Relationship/Approach2(One to Many)/Models
    $touch customer.js

*/

const mongoose = require("mongoose");

// To connect with database
main()
.then(()=>console.log('connection sucessfully'))
.catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

//i)Order Schema and Model (Child)
const orderSchema = new mongoose.Schema({
    item:String,
    price:Number
});

const Order = mongoose.model("Order",orderSchema);

//ii)Insert data into Order Collection
const addOrders = async () =>{
    let res = await Order.insertMany([
        {item:"Somasa",price:12},
        {item:"Chips",price:10},
        {item:"Chocolate",price:40}
    ]);
}
addOrders();

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

    let result= await cust1.save();
    console.log(result);// {
                        //     name: 'Rahul Kumar',
                        //     orders: [
                        //        {_id: ObjectId('665afc10800bc1e9d6b59f89'),item: 'Chips',price: 10,__v: 0},
                        //        { _id: ObjectId('665afc10800bc1e9d6b59f8a'),item: 'Chocolate',price: 40,__v: 0}
                        //     ],
                        //     _id: new ObjectId('665afdac11ca2e15b3256ff4'),
                        //     __v: 0
                        // }
}
addCustomer();

//v)Find all Customer data
const findCustomer = async ()=>{
    let res = await Customer.find({});
    console.log(res);   // [
                        //   {
                        //     _id: new ObjectId('665afdac11ca2e15b3256ff4'),
                        //     name: 'Rahul Kumar',
                        //     orders: [
                        //         new ObjectId('665afc10800bc1e9d6b59f89'),
                        //         new ObjectId('665afc10800bc1e9d6b59f8a')
                        //     ],
                        //     __v: 0
                        //   }
                        // ]
}
findCustomer();

/* Note :
    While inserting customer data into database it shows order(child) collection all details => as line no 91
    but , in mongoDB Database/mongoDB Shell only ObjectID shows into Customer Collection or
          find customer data it show only ObjectID into Customer Collection data => as line no 106
*/

/*  populate('childCollectionNameKey that stores in parent(Customer) Schema') :
        Populated paths are no longer set to their original _id , their value is replaced with the mongoose document
        returned from the database by performing a separate query before returning the results.
*/

//vi)Find the order details of Customer Collection(Parent)
const findpopCustomer = async () => {
    let result = await Customer.find({}).populate('orders');
    console.log(result);//      [
                        //          {
                        //               _id: new ObjectId('665afdac11ca2e15b3256ff4'),
                        //              name: 'Rahul Kumar',
                        //              orders: [ [Object], [Object] ],
                        //              __v: 0
                        //          }
                        //      ]
    console.log(result[0]); // {
                            //     _id: new ObjectId('665afdac11ca2e15b3256ff4'),
                            //     name: 'Rahul Kumar',
                            //     orders: [
                            //     {
                            //         _id: new ObjectId('665afc10800bc1e9d6b59f89'),
                            //         item: 'Chips',
                            //         price: 10,
                            //         __v: 0
                            //     },
                            //     {
                            //         _id: new ObjectId('665afc10800bc1e9d6b59f8a'),
                            //         item: 'Chocolate',
                            //         price: 40,
                            //         __v: 0
                            //     }
                            //     ],
                            //     __v: 0
                            // }
}
findpopCustomer();


/* Git Bash/Terminal :

    Sanket Aher@DESKTOP-7UDIT7I MINGW64 /e/learning/MongoDB Learn/03.MongoDB 1-M Relationship/Approach2(One to Many)/Models
    $node customer.js
    connection sucessfully 
    .
    .
    .
*/


