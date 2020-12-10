'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'categories',
      [
        {
          name: 'Lodging',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Dining',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Activity',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Event',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Transportation',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
