# Photo App API

## About

This is a REST API with authentication that will be able to function as the backend for a future photo app, and follows the jsend response specification, as well as Resource Controller pattern

## Features

A user can:

- create a new account
- receive a JWT token upon logging in.
- CRUD (create, read, update and delete) operations on a photo
- Perform CRUD operations on an album
- create, read and delete a photo in an album, and add many photos to an album

## Tech stack

- language: Typescript
- ORM: Prisma
- framework: Node.js with Express (minimum version 4.18)
- middleware: Morgan
