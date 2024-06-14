# Handling Deletion in 1-M Relationship

In this folder, you will learn about how to handle deletions in One-to-Many (1-M) relationships using Mongoose middleware. This ensures that when a parent document is deleted, the associated child documents are also deleted.

## Contents

1. [Introduction](#introduction)
2. [Setting Up Mongoose Middleware](#setting-up-mongoose-middleware)
3. [Ensuring Data Integrity](#ensuring-data-integrity)

## Introduction

Handling deletions in One-to-Many (1-M) relationships is crucial to maintain data integrity. Using Mongoose middleware, we can automatically delete child documents when a parent document is removed.

## Setting Up Mongoose Middleware

Mongoose middleware allows you to define pre and post hooks for various model operations.

## Ensuring Data Integrity

By setting up appropriate middleware, you can ensure that your database remains consistent. When a parent document is deleted, the associated child documents are also removed, preventing orphaned records and maintaining the integrity of your data.

Thank you for using this resource!