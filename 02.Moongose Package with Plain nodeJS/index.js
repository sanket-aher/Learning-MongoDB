/*
 Mongoose Package : A library that creates a connection between MongoDB and NodeJS Javascript Runtime Environment.
                    It is an ODM(Object Data Modelling) Library.
            Installation : npm i mongoose
*/

/* Q.Difference between MongoDB Database/Mongo Shell and Mongoose Package? */
/*Ans.  MongoDB is a NoSQL database that stores data in a flexible, schema-less format, while Mongoose is an Object Data Modelling (ODM) library that provides a schema-based solution for modelling MongoDB data in Node.js applications. */

/* Terminal/Git Bash :

    Sanket Aher@DESKTOP-7UDIT7I MINGW64 /e/learning/MongoDB Learn/02.Moongose Package with Plain nodeJS
    $npm init -y
    Sanket Aher@DESKTOP-7UDIT7I MINGW64 /e/learning/MongoDB Learn/02.Moongose Package with Plain nodeJS
    $npm i mongoose (A library that creates a connection between MongoDB and NodeJS.It is an ODM(Object Data Modeling) Library.)
    Sanket Aher@DESKTOP-7UDIT7I MINGW64 /e/learning/MongoDB Learn/02.Moongose Package with Plain nodeJS
    $touch index.js
    Sanket Aher@DESKTOP-7UDIT7I MINGW64 /e/learning/MongoDB Learn/02.Moongose Package with Plain nodeJS
    $touch book.js
    Sanket Aher@DESKTOP-7UDIT7I MINGW64 /e/learning/MongoDB Learn/02.Moongose Package with Plain nodeJS
    $node index.js


*/

const mongoose = require('mongoose'); // A library that creates a connection between MongoDB and NodeJS.It is an ODM(Object Data Modeling) Library.


// To connect a MongoDB Database.

/* Note : Mongoose uses operation buffering i.e mongoose lets you start using your schema,models immediately without waiting for mongoose to establish a connection to MongoDB.  */
main()
.then(()=>{
        console.log('connection sucessfully');
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test'); // 'test' is the databaseName you can give any databaseName here.
}

/*  Schema : Schema defines the shape/structure of the documents within that collection.Bydefault 'Id' property add to your schema. 
             The permitted SchemaTypes are: String,Number,Date,Buffer,Boolean,Mixed,ObjectId,Array,Decimal128,Map,UUID. */

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    age:Number
});

/* Model :
   A Mongoose model is a wrapper on the Mongoose schema.Model in mongoose is a class with which we construct documents.
    Syntax : mongoose.model("CollectionName",SchemaName);
*/


const UserCollection = mongoose.model("User",userSchema); // Try to give CollectionName => starting word capital and singular bcz in mongodb shell/mongodb database the collectionName => becomes starting word small and plural (i.e User(In mongoose) became users(In mongodb shell/mongodb database) ) 

/* CRUD : */

/* 1]Insert document/record into the database */

//Insert Single Record 

/* Ex1 */
const user1= new UserCollection({
  name:"adam",
  email:"adam@yahoo.in",
  age:48
});

//save() method Saves this document by inserting a new document into the database
user1.save(); 

/* Ex2 */
const user2= new UserCollection({
  name:"eve",
  email:"eve@yahoo.in",
  age:48
});

user2.save()
.then((res)=>{
  console.log(res); // { name: 'eve',email: 'eve@yahoo.in',age: 48,_id: new ObjectId('664a4529fcd4e7d001109f8f'),__v: 0}
})
.catch((err)=>{
  console.log(err);
});



// Insert Multiple Records

/* Ex1 */
UserCollection.insertMany([
  {name:"Tony",email:"tony@gmail.com",age:50},
  {name:"Petter",email:"petter@gmail.com",age:30},
  {name:"Bruce",email:"bruce@gmail.com",age:47}
]).then((res)=>{
  console.log(res);
});

/* MongoDB Shell 

Please enter a MongoDB connection string (Default: mongodb://localhost/): mongodb://localhost:27017

test>show collections
users

test> db.users.find()
[
  {
    _id: ObjectId('664a497089a9e06ab212531c'),
    name: 'adam',
    email: 'adam@yahoo.in',
    age: 48,
    __v: 0
  },
  {
    _id: ObjectId('664a4529fcd4e7d001109f8f'),
    name: 'eve',
    email: 'eve@yahoo.in',
    age: 48,
    __v: 0
  },
  {
    _id: ObjectId('664a49466fe7ef1b2f278587'),
    name: 'Tony',
    email: 'tony@gmail.com',
    age: 50,
    __v: 0
  },
  {
    _id: ObjectId('664a49466fe7ef1b2f278588'),
    name: 'Petter',
    email: 'petter@gmail.com',
    age: 30,
    __v: 0
  },
  {
    _id: ObjectId('664a49466fe7ef1b2f278589'),
    name: 'Bruce',
    email: 'bruce@gmail.com',
    age: 47,
    __v: 0
  }
]

*/

/* 2]Find document/record into the database */

/* Model.find() : Returns a Query Object(thennable).Mongoose Queries are not promises,but they have a .then() method  */

// i)find all documents/records into the collection/table using find({}) 
/* Ex1 */
UserCollection.find({})
.then((res)=>{
  console.log("All Results",res);
})
.catch((err)=>{
  console.log(err);
});

// ii)find single document/record into the collection/table using find({<filter>}) OR findById("Id")
/* Ex1 */
UserCollection.findOne({age: {$gt: 47}})
.then((res)=>{
  console.log("Result 1",res);
})
.catch((err)=>{
  console.log(err);
});

/* Ex2 */
UserCollection.findOne({_id: "664a49466fe7ef1b2f278589"})
.then((res)=>{
  console.log("Result 2",res); //Result 2 { _id: new ObjectId('664a49466fe7ef1b2f278589'),name: 'Bruce',email: 'bruce@gmail.com',age: 47,__v: 0}
})
.catch((err)=>{
  console.log(err);
});

/* Ex3 */
UserCollection.findById("664a49466fe7ef1b2f278589")
.then((res)=>{
  console.log("Result 3",res); //Result 3 { _id: new ObjectId('664a49466fe7ef1b2f278589'),name: 'Bruce',email: 'bruce@gmail.com',age: 47,__v: 0}
})
.catch((err)=>{
  console.log(err);
});

//  iii)find multiple document/record into the collection/table using findMany({<filter>)
/* Ex1 */
UserCollection.find({age: {$gt: 47}})
.then((res)=>{
  console.log("Results",res);
})
.catch((err)=>{
  console.log(err);
});

/* 3]Update document/record into the database */

// i)UPDATE at most a single record/document even though multiple documents/records may matches the specified filter using updateOne(<filter>)
/* Ex1 : Q. Update a 'Bruce' document age to age = 49 */
UserCollection.updateOne({name:'Bruce'},{ age : 49 })
.then((res)=>{
  console.log("updateOne Result",res); //updateOne Result {acknowledged: true,modifiedCount: 1,upsertedId: null,upsertedCount: 0,matchedCount: 1 }
})
.catch((err)=>{
  console.log(err);
});

// ii)UPDATE all documents/records that matches the specified filter using updateMany(<filter>)
/* Ex1 : Q. Update all documents whose age is less than or equal to 48 and set to 55 */
UserCollection.updateMany({age :{ $lte : 48 }},{ age : 55 })
.then((res)=>{
  console.log("updateMany Result",res); //updateMany Result {acknowledged: true,modifiedCount: 3,upsertedId: null,upsertedCount: 0,matchedCount: 3 }
})
.catch((err)=>{
  console.log(err);
});

// iii)find one document and update it using findOneAndUpdate(condition,update,[new:false(bydefault)/true])
/* Ex1 : Q. Update a 'Bruce' old emailId(i.e 'bruce@gmail.com') to new emailId(i.e 'bruce123@gmail.com') */
UserCollection.findOneAndUpdate({email:'bruce@gmail.com'},{ email:'bruce123@gmail.com' })
.then((res)=>{
  console.log("findOneAndUpdate Result1",res); //findOneAndUpdate Result1 {_id: new ObjectId('664a49466fe7ef1b2f278589'),name: 'Bruce',email: 'bruce@gmail.com',age: 49,__v: 0 }
 // Note :Here on above console.log() the old emailId is displayed i.e bruce@gmail.com but on database it is update you can check on mongoShell Command to overcome use 3rd parameter new:true so that updated value will be displayed. 
})
.catch((err)=>{
  console.log(err);
});

/* Ex2 : Q. Update a 'Eve' old emailId(i.e 'eve@yahoo.in') to new emailId(i.e 'eve123@yahoo.in') */

// new:false (bydefault), if set true => return the modified document rather than the original
UserCollection.findOneAndUpdate({email:'eve@yahoo.in'},{ email:'eve123@yahoo.in' },{new:true})
.then((res)=>{
  console.log("findOneAndUpdate Result2",res); //findOneAndUpdate Result2 { _id: new ObjectId('664a4529fcd4e7d001109f8f'),name: 'eve',email: 'eve123@yahoo.in',age: 55,__v: 0 }
})
.catch((err)=>{
  console.log(err);
});

// iv)find one document by id and update it using findByIdAndUpdate(id,update,[new:false(bydefault)/true])
/* Ex1 : Q. Update a 'Petter' old emailId(i.e 'petter@gmail.com') to new emailId(i.e 'petter1234@gmail.com') */
UserCollection.findByIdAndUpdate("664a49466fe7ef1b2f278588",{email:'petter1234@gmail.com' },{new:true})
.then((res)=>{
  console.log("findByIdAndUpdate Result3",res); //findByIdAndUpdate Result3 {_id: new ObjectId('664a49466fe7ef1b2f278588'),name: 'Petter',email: 'petter1234@gmail.com',age: 55,__v: 0}
})
.catch((err)=>{
  console.log(err);
});


/* 4]Delete document/record into the database */

// i)DELETE at most a single record/document even though multiple documents/records may matches the specified filter using deleteOne(<filter>)
/* Ex1 : Q. Delete a 'Bruce' document. */
UserCollection.deleteOne({name:'Bruce'})
.then((res)=>{
  console.log("deleteOne Result",res); //  deleteOne Result { acknowledged: true, deletedCount: 1 }
})
.catch((err)=>{
  console.log(err);
});

// ii)DELETE all documents/records that matches the specified filter using deleteMany(<filter>)
/* Ex1 : Q. DELETE all documents whose emailId is 'tony@gmail.com' and 'adam@yahoo.in'  */
UserCollection.deleteMany({$or:[{email:"tony@gmail.com"},{email:"adam@yahoo.in"}]})
.then((res)=>{
  console.log("deleteMany Result1",res);  // deleteMany Result1 { acknowledged: true, deletedCount: 2 }
})
.catch((err)=>{
  console.log(err);
});

// /* Ex2: Q. Delete All documents */
// UserCollection.deleteMany({})
// .then((res)=>{
//   console.log("deleteMany Result2",res);  // deleteMany Result2 { acknowledged: true, deletedCount: 3 }
// })
// .catch((err)=>{
//   console.log(err);
// });

// iii)find one document and delete it using findOneAndDelete(condition)
/* Ex1 : Q. Delete a record whose name is 'eve' */
UserCollection.findOneAndDelete({name:'eve'})
.then((res)=>{
  console.log("findOneAndDelete Result1",res); // findOneAndDelete Result1 {_id: new ObjectId('664a6cd5fe0bcde27b1cbbeb'),name: 'eve',email: 'eve123@yahoo.in',age: 55,__v: 0}
})
.catch((err)=>{
  console.log(err);
});

// iv)find one document by id and delete it using findByIdAndDelete(id)
/* Ex1 : Q. Delete a record whose id = "664a49466fe7ef1b2f278588" */
UserCollection.findByIdAndDelete("664a49466fe7ef1b2f278588")
.then((res)=>{
  console.log("findByIdAndDelete Result2",res); //findByIdAndDelete Result2 {_id: new ObjectId('664a49466fe7ef1b2f278588'),name: 'Petter',email: 'petter1234@gmail.com',age: 55,__v: 0}
})
.catch((err)=>{
  console.log(err);
});

