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

Simply run `npm test` and all your tests in the `test/` directory will be run.

## Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```
$ npm install -g @feathersjs/cli          # Install Feathers CLI

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers generate model                 # Generate a new Model
$ feathers help                           # Show all commands
```
