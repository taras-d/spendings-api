# spendings-api

> REST API for Spendings app

## About

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

## Requirements
- Node 8 or higher
- [Feathers CLI](https://github.com/feathersjs/cli)
- [Sequelize CLI](https://github.com/sequelize/cli)

## Installation
```
npm install            # Install node dependencies
sequelize db:migrate   # Run database migrations
sequelize db:seed:all  # Seed database with initial data 
```

## Start app
```
npm start              # Start Feathers app
```

## Testing
Tests can be run only in test enviroment. Make sure you set `NODE_ENV=test`.
```
NODE_ENV=test sequelize db:migrate     # Run migrations if needed
NODE_ENV=test npm test                 # Run tests
```

## Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```
$ npm install -g @feathersjs/cli          # Install Feathers CLI

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers generate model                 # Generate a new Model
$ feathers help                           # Show all commands
```
