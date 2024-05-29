const mongoose = require('mongoose'); // A library that creates a connection between MongoDB and NodeJS.It is an ODM(Object Data Modeling) Library.


// To connect a MongoDB Database.

/* Note : Mongoose uses operation buffering i.e mongoose lets you start using your schema,models immediately without waiting for mongoose to establish a connection to MongoDB.  */
main()
.then(()=>{
        console.log('connection sucessfully');
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/amazon'); // 'amazon' is the databaseName you can give any databaseName here.
}

/* Schema Validations/Constraints : Rules for Schema
    url for types of schemas : https://mongoosejs.com/docs/schematypes.html
*/

/* Ex1 : Schema types */

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true, // required is similar to Not Null MySQL Constraints
        maxLength:20 // Maximum Length should be 20
    },
    author:{
        type:String
    },
    price:{
        type:Number,
        min:[1,"Price is too low for Amazon Selling"] // Minimum price should be 1 i.e price should be greater than or equals to 1 with custom error message if error occurs while inserting data
    },
    discount:{
        type:Number,
        default:0 // Default value should be 0
    },
    category:{
        type:String,
        enum:['Fiction','NonFiction'] // enum value should be Fiction or NonFiction
    },
    genre:[String]  // Arrays of String
});

const Book = mongoose.model("Book",bookSchema);

let book1=new Book({
    title:"Mathematics XII",
    author:"RD Sharma",
    price:900,
    discount:10,
    category:"Fiction",
    genre:["comics","superhero"]
});

book1.save()
.then((res)=>{
    console.log(res);// { title: 'Mathematics XII',author: 'RD Sharma',price: 900,discount: 10,category: 'Fiction',genre: [ 'comics', 'superhero' ],_id: new ObjectId('664b4b9a3757b54f0b0c1b52'),__v: 0 }
})
.catch((err)=>{
    console.log(err);
});

let book2=new Book({
    title:"Mathematics VIII",
    price:1200,
    genre:["comics","superhero"]
});

book2.save()
.then((res)=>{
    console.log(res); // { title: 'Mathematics VIII',price: 1200,discount: 0,genre: [ 'comics', 'superhero' ],_id: new ObjectId('664b4b9a3757b54f0b0c1b53'),__v: 0}
    
})
.catch((err)=>{
    console.log(err);
});

let book3=new Book({
    title:"Mathematics V",
    price:150,
    discount:20,
    category:"NonFiction"
});

book3.save()
.then((res)=>{
    console.log(res); // { title: 'Mathematics V',price: 150,discount: 20,category: 'NonFiction',genre: [],_id: new ObjectId('664b4b9a3757b54f0b0c1b54'),__v: 0 }
})
.catch((err)=>{
    console.log(err);
});

/* Schema Validations in Update Command And Errors */

/* Ex1 : Error in Update Command */
Book.findByIdAndUpdate("664b4b9a3757b54f0b0c1b54",{price:-100},{new:true})
.then((res)=>{
    console.log(res); // { _id: new ObjectId('664b4b9a3757b54f0b0c1b54'),title: 'Mathematics V',price: -100,discount: 20,category: 'NonFiction',genre: [],__v: 0 }
    /* Note : In update command the Schema is not working perfectly 
              bcz price should be greater than or equal to 1 but we update it by -100 and it updated successfully.
              So to overcome this use paramater called runValidators:true, see on example 3.
    */
})
.catch((err)=>{
    console.log(err);
});

/* Ex2: Now Set the price value to the original price i.e 150 to see the result of Ex3 */
Book.findByIdAndUpdate("664b4b9a3757b54f0b0c1b54",{price:150},{new:true})
.then((res)=>{
    console.log(res); // { _id: new ObjectId('664b4b9a3757b54f0b0c1b54'),title: 'Mathematics V',price: 150,discount: 20,category: 'NonFiction',genre: [],__v: 0 }
})
.catch((err)=>{
    console.log(err);
});

/* Ex3 : Overcome Error in Update Command of Ex1) */

//runValidators:false(byDefault), if set true => runs update validators on this command. Update validators validate the update operation against the model's schema
Book.findByIdAndUpdate("664b4b9a3757b54f0b0c1b54",{price:-100},{runValidators:true})
.then((res)=>{
    console.log(res); 
})
.catch((err)=>{
    console.log(err.errors.price.properties.message); //Price is too low for Amazon Selling
});


/* MongoDB Shell 

Please enter a MongoDB connection string (Default: mongodb://localhost/): mongodb://localhost:27017

test>use amazon
amazon

amazon> db.books.find()
[
  {
    _id: ObjectId('664b4b9a3757b54f0b0c1b52'),
    title: 'Mathematics XII',
    author: 'RD Sharma',
    price: 900,
    discount: 10,
    category: 'Fiction',
    genre: [ 'comics', 'superhero' ],
    __v: 0
  },
  {
    _id: ObjectId('664b4b9a3757b54f0b0c1b53'),
    title: 'Mathematics VIII',
    price: 1200,
    discount: 0,
    genre: [ 'comics', 'superhero' ],
    __v: 0
  },
  {
    _id: ObjectId('664b4b9a3757b54f0b0c1b54'),
    title: 'Mathematics V',
    price: 150,
    discount: 20,
    category: 'NonFiction',
    genre: [],
    __v: 0
  }
]

*/