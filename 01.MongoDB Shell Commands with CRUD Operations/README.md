# MongoDB Shell Commands with CRUD Operations

In this folder, you will learn about the MongoDB Shell and its commands, as well as how to perform CRUD (Create, Read, Update, Delete) operations.

## Contents

1. [Introduction to MongoDB Shell](#introduction-to-mongodb-shell)
2. [MongoDB Shell Commands List](#mongodb-shell-commands-list)
3. [BSON: What and Why?](#bson-what-and-why)
4. [JSON vs BSON](#json-vs-bson)
5. [Collections in MongoDB](#collections-in-mongodb)
6. [Basic CRUD Operations](#basic-crud-operations)
7. [Query Operators for find](#query-operators-for-find)
8. [Additional Resources](#additional-resources)

## Introduction to MongoDB Shell

The MongoDB Shell (`mongo`) is an interactive JavaScript interface to MongoDB, allowing administrators and developers to interact with MongoDB databases. For installation instructions, visit the [installation guide](https://github.com/sanket-aher/Learning-MongoDB/blob/main/MongoDB%20Installation.pdf).

## MongoDB Shell Commands List

- `help`: Displays a list of all available commands.
- `show dbs`: Lists all databases.
- `show db`: Displays the current database.
- `show collections`: Lists all collections in the current database.
- `cls`: Clears the screen.
- `use <database_name>`: Switches to the specified database (creates it if it doesn't exist).
- `exit`: Exits the MongoDB Shell.

## BSON: What and Why?

BSON (Binary JSON) is a binary representation of JSON-like documents, designed to be efficient in space and speed.

## JSON vs BSON

- **JSON**: Text-based, human-readable, slower parsing.
- **BSON**: Binary, machine-readable, faster parsing, supports more data types (e.g., dates, binary data).

## Collections in MongoDB

A collection is a group of MongoDB documents, equivalent to a table in relational databases.

## Basic CRUD Operations

- **Create Collection**: `db.createCollection("collection_name")`
- **Insert One**: `db.collection_name.insertOne({ key: "value" })`
- **Insert Many**: `db.collection_name.insertMany([{ key1: "value1" }, { key2: "value2" }])`
- **Find One**: `db.collection_name.findOne({ key: "value" })`
- **Find**: `db.collection_name.find({ key: "value" })`
- **Update One**: `db.collection_name.updateOne({ key: "value" }, { $set: { key: "new_value" } })`
- **Update Many**: `db.collection_name.updateMany({ key: "value" }, { $set: { key: "new_value" } })`
- **Replace One**: `db.collection_name.replaceOne({ key: "value" }, { key: "new_value" })`
- **Delete One**: `db.collection_name.deleteOne({ key: "value" })`
- **Delete Many**: `db.collection_name.deleteMany({ key: "value" })`
- **Drop Database**: `db.dropDatabase()`

### Difference between find() and findOne()

- **find()**: Returns a cursor to all documents matching the query.
- **findOne()**: Returns the first document matching the query.

## Query Operators for find

- `$eq`: Matches values equal to a specified value.
- `$gt`: Matches values greater than a specified value.
- `$gte`: Matches values greater than or equal to a specified value.
- `$lt`: Matches values less than a specified value.
- `$lte`: Matches values less than or equal to a specified value.
- `$ne`: Matches all values not equal to a specified value.
- `$in`: Matches any of the values specified in an array.
- `$nin`: Matches none of the values specified in an array.

Example:

```sh
db.collection_name.find({ key: { $gt: value } })
```

## Additional Resources
In this folder, you will find:

[index.html](https://github.com/sanket-aher/Learning-MongoDB/blob/main/01.MongoDB%20Shell%20Commands%20with%20CRUD%20Operations/index.html): A file containing all the information about MongoDB Shell Commands. You can download it and run it in your browser by double-clicking on the file to view the content.

**Happy learning!**