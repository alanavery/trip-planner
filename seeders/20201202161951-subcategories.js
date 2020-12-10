'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'subcategories',
      [
        {
          name: 'Hotel',
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'House/Apartment',
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Restaurant',
          categoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Bar',
          categoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Night Club',
          categoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Sightseeing',
          categoryId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Museum',
          categoryId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Shopping',
          categoryId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Outdoor Activity',
          categoryId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Attraction',
          categoryId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Concert',
          categoryId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Sporting Event',
          categoryId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Theater',
          categoryId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Flight',
          categoryId: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Train',
          categoryId: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Automobile',
          categoryId: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('subcategories', null, {});
  }
};
