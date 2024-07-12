'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('meet-details', 'meet-details_creater_id_attendee_id_key');
    await queryInterface.addConstraint('meet-details', {
      name: 'meet-details_creater_id_attendee_id_key',
      fields: ['creater_id', 'attendee_id', 'date', 'startTime', 'endTime'],
      type: 'UNIQUE',
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
