'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addIndex('meet-details', ['created_by', 'creater_id', 'meet_with', 'attendee_id', 'subject', 'date', 'startTime', 'endTime'], {
      indexName: 'meet_details_group_index',
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
