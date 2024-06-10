# Mongoose Package with Plain Node.js

In this folder, you will learn about the Mongoose package, how to connect with a MongoDB database using Mongoose, and perform CRUD operations.

In this folder, you will find:

- [index.js](https://github.com/sanket-aher/Learning-MongoDB/blob/main/02.Moongose%20Package%20with%20Plain%20nodeJS/index.js): Contains code for connecting to MongoDB,schema,model and basic examples of CRUD operations.
- [book.js](https://github.com/sanket-aher/Learning-MongoDB/blob/main/02.Moongose%20Package%20with%20Plain%20nodeJS/book.js): Contains code for connecting to MongoDB,schema,model for a Book collection.

## Contents

1. [Introduction to Mongoose](#introduction-to-mongoose)
2. [Connecting to MongoDB](#connecting-to-mongodb)
3. [Schema and Model](#schema-and-model)
4. [CRUD Operations](#crud-operations)

## Introduction to Mongoose

Mongoose is an ODM library for MongoDB and Node.js, providing a schema-based solution to model application data.

## Connecting to MongoDB

Install the Mongoose package and connect to a MongoDB database using the `mongoose.connect` method.

## Schema and Model

Define a schema to structure documents within a collection, then create a model based on that schema to interact with the database.

## CRUD Operations

### Insert Single Document

Add a single document to the collection using the model's `save` method.

### Insert Multiple Documents

Add multiple documents to the collection using the model's `insertMany` method.

### Find Document

Retrieve documents from the collection using the model's `findOne` or `find` methods.

### Update Document

Modify existing documents in the collection using the model's `updateOne` or `updateMany` methods.

### Delete Document

Remove documents from the collection using the model's `deleteOne` or `deleteMany` methods.

Thank you for using this resource!