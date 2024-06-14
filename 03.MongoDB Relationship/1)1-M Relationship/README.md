# 1-M Relationship

In this folder, you will learn about different approaches to handling One-to-Many (1-M) relationships in MongoDB.

This folder contains three sections:
1. **Approach 1: One to Few**: Suitable for scenarios where the related documents are few in number.
2. **Approach 2: One to Many**: Suitable for scenarios where the number of related documents is large but manageable.
3. **Approach 3: One to Squillions**: Suitable for scenarios where the number of related documents is extremely large.

For more detailed guidance on MongoDB schema design, refer to the [MongoDB Blog: 6 Rules of Thumb for MongoDB Schema Design](https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design).

## Contents

1. [Introduction to 1-M Relationship](#introduction-to-1-m-relationship)
2. [Approach 1: One to Few](#approach-1-one-to-few)
3. [Approach 2: One to Many](#approach-2-one-to-many)
4. [Approach 3: One to Squillions](#approach-3-one-to-squillions)

## Introduction to 1-M Relationship

One-to-Many (1-M) relationships are a common pattern in database design where a single document references multiple documents in another collection. MongoDB provides flexible ways to model these relationships depending on the use case.

## Approach 1: One to Few

This section covers scenarios where the related documents are few in number, making it feasible to embed them directly within the parent document.

## Approach 2: One to Many

This section covers scenarios where the number of related documents is large but manageable. Typically, this involves referencing the related documents rather than embedding them.

## Approach 3: One to Squillions

This section covers scenarios where the number of related documents is extremely large. This approach typically involves more advanced techniques such as bucketing or pagination.

Thank you for using this resource!