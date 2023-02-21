# Address Book Project

This is a simple address book project built using Node.js, Nest framework and MongoDB. It allows users to create, read, update, and delete addresses in their address book. The project is a RESTful API that uses the HTTP methods (GET, POST, PUT, DELETE) to perform the CRUD operations.

## Prerequisites

Node.js
MongoDB

## Local Setup

1- Install [Node.js](https://nodejs.org/en/download/)

2- Install [MongoDB](mongodb.com/try/download/community)

3- Install [git](https://git-scm.com/downloads)

4- Clone the repository

$ git clone https://github.com/MahmoudSerag/Gebhaly-Task.git

5- `cd` to the repository directory

$ `cd` Gebhaly-Task

6- Create `.env` file, and add [Environment Variables](#environment-variables) to it:

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Environment Variables

```
MONGO_URI = mongodb connection url, example: `mongodb://localhost:27017/project-name`
JWT_SECRET = any string secret, example: my secret
JWT_EXPIRE_IN = example: 2d
PORT = ${port number that server will running on}, example: `3000`
```