/* Approach1 : One to Few
        Store the child document inside parent document
*/

/* Layout of parent document :
    
    {
        _id:ObjectId("665aeec510fb2ef4bf5e915e"),
        username:'john',
        addresses:[
            {
                location:'Baker Street',
                city:'London'
            },
            {
                location:'P36 DownTown',
                city:'London'
            }
        ],
        __v:0
    }

*/

/* Git Bash/Terminal :

    Sanket Aher@DESKTOP-7UDIT7I MINGW64 /e/learning/MongoDB Learn/03.MongoDB 1-M Relationship/Approach1(One to Few)
    $npm init -y
    Sanket Aher@DESKTOP-7UDIT7I MINGW64 /e/learning/MongoDB Learn/03.MongoDB 1-M Relationship/Approach1(One to Few)
    $npm i express
    Sanket Aher@DESKTOP-7UDIT7I MINGW64 /e/learning/MongoDB Learn/03.MongoDB 1-M Relationship/Approach1(One to Few)
    $npm i mongoose
    Sanket Aher@DESKTOP-7UDIT7I MINGW64 /e/learning/MongoDB Learn/03.MongoDB 1-M Relationship/Approach1(One to Few)
    $mkdir Models
    Sanket Aher@DESKTOP-7UDIT7I MINGW64 /e/learning/MongoDB Learn/03.MongoDB 1-M Relationship/Approach1(One to Few)
    $cd Models
    Sanket Aher@DESKTOP-7UDIT7I MINGW64 /e/learning/MongoDB Learn/03.MongoDB 1-M Relationship/Approach1(One to Few)/Models
    $touch user.js

*/

const mongoose = require("mongoose");

// To connect with database
main()
.then(()=>console.log('connection sucessfully'))
.catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

const userSchema = new mongoose.Schema({
    username:String,
    addresses:[
        {
            _id:false,  // to dissable mongoose '_id' , do not store different _id's while inserting data
            location:String,
            city:String
        }
    ]
});

const User = mongoose.model("User",userSchema);

const addUsers = async () =>{
    let user1 = new User({
        username:'john',
        addresses:[
            {
                location:'Baker Street',
                city:'London'
            },
            {
                location:'P36 DownTown',
                city:'London'
            }
        ]
    });

    user1.addresses.push({location:'P32 WallStreet',city:'London'}); // inserting record

    let result = await user1.save();
    console.log(result); //  {
                        //      username: 'john',
                        //      addresses: [
                        //          { location: 'Baker Street', city: 'London' },
                        //          { location: 'P36 DownTown', city: 'London' },
                        //          { location: 'P32 WallStreet', city: 'London' }
                        //      ],
                        //      _id: new ObjectId('665aeec510fb2ef4bf5e915e'),
                        //      __v: 0
                        //   }
};
addUsers();


/* Git Bash/Terminal :

    Sanket Aher@DESKTOP-7UDIT7I MINGW64 /e/learning/MongoDB Learn/03.MongoDB 1-M Relationship/Approach1(One to Few)/Models
    $node user.js
    connection sucessfully
    {
        username: 'john',
        addresses: [
            { location: 'Baker Street', city: 'London' },
            { location: 'P36 DownTown', city: 'London' },
            { location: 'P32 WallStreet', city: 'London' }
        ],
        _id: new ObjectId('665aeec510fb2ef4bf5e915e'),
        __v: 0
   }
*/