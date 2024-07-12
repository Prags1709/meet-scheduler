/** @type {import('sequelize-cli').Migration} */

const tableName = 'meet-details'
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable( tableName, {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      created_by: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      creater_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      meet_with: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      attendee_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      subject: {
        allowNull: true,
        type: Sequelize.STRING
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      startTime: {
        allowNull: false,
        type: Sequelize.TIME,
      },
      endTime: {
        allowNull: false,
        type: Sequelize.TIME,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    },{
      uniqueKeys: {
        Items_unique: {
          fields: ['creater_id', 'attendee_id'],
        },
      },
    })
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
