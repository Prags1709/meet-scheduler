module.exports = DataTypes => ({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      created_by: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      creater_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      meet_with: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      attendee_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      subject: {
        allowNull: true,
        type: DataTypes.STRING
      },
      date: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      startTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      }
})