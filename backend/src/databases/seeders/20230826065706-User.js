'use strict'
const argon = require('argon2')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        const password = await argon.hash('password')
        await queryInterface.bulkInsert('Users', [{
            firstName: 'John',
            lastName:'doe',
            email:'john@mail.com',
            password: password
        }], {})
    },

    async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    }
}
