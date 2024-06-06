/* Approach3 : One to Squillions
        Store a reference of the parent document inside child document
*/

/* Layout of child document :
    
    {
        _id:ObjectId("665b27bd301c767259b84c77"),
        content:'Hello World!',
        likes:7,
        user:ObjectId("665b26421f19b005ad29fbe7"),         //parent id
        __v:0
    },
    {
        _id:ObjectId("665b27bd301c767259b84c78"),
        content:'Bye Bye',
        likes:23,
        user:ObjectId("665b26421f19b005ad29fbe7"),         //parent id
        __v:0
    }

*/

/* Git Bash/Terminal :

    Sanket Aher@DESKTOP-7UDIT7I MINGW64 /e/learning/MongoDB Learn/03.MongoDB 1-M Relationship/Approach3(One to Squillions)
    $npm init -y
    Sanket Aher@DESKTOP-7UDIT7I MINGW64 /e/learning/MongoDB Learn/03.MongoDB 1-M Relationship/Approach3(One to Squillions)
    $npm i express
    Sanket Aher@DESKTOP-7UDIT7I MINGW64 /e/learning/MongoDB Learn/03.MongoDB 1-M Relationship/Approach3(One to Squillions)
    $npm i mongoose
    Sanket Aher@DESKTOP-7UDIT7I MINGW64 /e/learning/MongoDB Learn/03.MongoDB 1-M Relationship/Approach3(One to Squillions)
    $mkdir Models
    Sanket Aher@DESKTOP-7UDIT7I MINGW64 /e/learning/MongoDB Learn/03.MongoDB 1-M Relationship/Approach3(One to Squillions)
    $cd Models
    Sanket Aher@DESKTOP-7UDIT7I MINGW64 /e/learning/MongoDB Learn/03.MongoDB 1-M Relationship/Approach3(One to Squillions)/Models
    $touch posts.js

*/

const mongoose = require("mongoose");

// To connect with database
main()
.then(()=>console.log('connection sucessfully'))
.catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo1');
}

//i)User Schema and Model  (Parent)
const userSchema = new mongoose.Schema({
    username:String,
    email:String
});

const User = mongoose.model("User",userSchema);

//ii)Insert Data into User Collection
const addUserData = async ()=>{
    let user1 = new User({
        username:"rahul kumar",
        email:"rahul@gmail.com"
    });
    await user1.save();
}
//addUserData();

// iii)Post Schema and Model (Child)
const postSchema = new mongoose.Schema({
        content:String,
        likes:Number,
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
});

const Post = mongoose.model("Post",postSchema);

//iv)Insert Data into Post Collection
const addPostData = async ()=>{
    let userData = await User.findOne({username:"rahul kumar"});

    let post1 = new Post({
        content:"Hello World!",
        likes:7
    });
    post1.user = userData;

    await post1.save();

    let post2 = new Post({
        content:"Bye Bye",
        likes:23
    });
    post2.user = userData;

    await post2.save();
}
//addPostData();

//v)Find any One Post into Post Collection(Child)
const getData = async() => {
    let res1 = await Post.findOne({}).populate("user");
    console.log(res1);  // {
                        //     _id: new ObjectId('665b27bd301c767259b84c77'),
                        //     content: 'Hello World!',
                        //     likes: 7,
                        //     user: {
                        //     _id: new ObjectId('665b26421f19b005ad29fbe7'),
                        //     username: 'rahul kumar',
                        //     email: 'rahul@gmail.com',
                        //     __v: 0
                        //     },
                        //     __v: 0
                        // }

    let res2 = await Post.findOne({}).populate("user","username");
    console.log(res2);  // {
                        //     _id: new ObjectId('665b27bd301c767259b84c77'),
                        //     content: 'Hello World!',
                        //     likes: 7,
                        //     user: {
                        //     _id: new ObjectId('665b26421f19b005ad29fbe7'),
                        //     username: 'rahul kumar'
                        //     },
                        //     __v: 0
                        // }
}
getData();



/*  Git Bash / Terminal
    Sanket Aher@DESKTOP-7UDIT7I MINGW64 /e/learning/MongoDB Learn/03.MongoDB 1-M Relationship/Approach3(One to Squillions)/Models
    $node posts.js
    connection sucessfully 
    {
        _id: new ObjectId('665b27bd301c767259b84c77'),
        content: 'Hello World!',
        likes: 7,
        user: {
            _id: new ObjectId('665b26421f19b005ad29fbe7'),
            username: 'rahul kumar',
            email: 'rahul@gmail.com',
            __v: 0
        },
        __v: 0
    }
    {
        _id: new ObjectId('665b27bd301c767259b84c77'),
        content: 'Hello World!',
        likes: 7,
        user: {
            _id: new ObjectId('665b26421f19b005ad29fbe7'),
            username: 'rahul kumar'
        },
        __v: 0
    }
*/