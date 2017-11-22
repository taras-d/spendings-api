const hashPassword = require('@feathersjs/authentication-local/lib/utils/hash');

const users = [
  {
    id: 'b2615be7-561b-44cf-b22e-627e680b8009',
    firstName: 'User', lastName: '1', email: `u1@mail.com`,
    createdAt: new Date(), updatedAt: new Date()
  },
  {
    id: '29eace92-ad57-4dd2-8821-50524214b973',
    firstName: 'User', lastName: '2', email: `u2@mail.com`,
    createdAt: new Date(), updatedAt: new Date()
  },
  {
    id: '470c6733-a4aa-475b-99a0-5f89cdd57e8e',
    firstName: 'User', lastName: '3', email: `u3@mail.com`,
    createdAt: new Date(), updatedAt: new Date()
  }
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    return hashPassword('abc123').then(hashedPassword => {
      users.forEach(user => user.password = hashedPassword);
      return queryInterface.bulkInsert('users', users);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', {
      id: {
        [Sequelize.Op.in]: users.map(user => user.id)
      }
    });
  }
};
