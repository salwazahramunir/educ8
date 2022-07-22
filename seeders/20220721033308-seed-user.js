'use strict';
const fs = require('fs');

const bcrypt = require('bcryptjs');

module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let salt = bcrypt.genSaltSync(10);
    let users = JSON.parse(fs.readFileSync('./data/user.json', 'utf-8'));
    users.forEach(el => {
      let hash = bcrypt.hashSync(el.password, salt);
      delete (el.id)
      el.password = hash
      el.createdAt = new Date()
      el.updatedAt = new Date()
    });

    return queryInterface.bulkInsert('Users', users, {});
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
