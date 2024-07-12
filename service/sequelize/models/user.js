const { Model, Op } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const userSchema = require('./schema/user')(DataTypes)

    class User extends Model {
        static associate(models) {
            this.hasMany(models.MeetDetails,{
              foreignKey: 'creater_id',
              as: 'creator'
            });
            this.hasMany(models.MeetDetails, {
              foreignKey: 'attendee_id',
              as: 'attendee'
            })
        }

        static async getAllUser(data = {}){
          try {
            const {currentUser, id} = data
            const users = await User.findAll({where: {
              [Op.not]: [
                {id: {[Op.eq]: id}},
                {name: {[Op.eq]: currentUser}}
              ]
            }, order: [['name','ASC']]});
            return users;
          } catch (error) {
            throw error
          }
        }

        static async getUserNameWithoutCurrentUser(data = {}){
          try {
            const {currentUser, id} = data
            const usersData = await User.findAll({where: {
              [Op.not]: [
                {id: {[Op.eq]: id}},
                {name: {[Op.eq]: currentUser}}
              ]
            }})
            return usersData;
          } catch (error) {
            throw error
          }
        }

        static async createUser(data = {}){
          try {
            const userData = await User.create(data)
            return userData
          } catch (error) {
            throw error
          }
        }

        static async fineUserByEmailAndPassword(payload = {}){
          try {
            const {email, password} = payload
            const user = await User.findOne({where: {email, password}})
            return user
          } catch (error) {
            throw error
          }
        }

        static async updateUserData( payload = {}, queryParam){
          try {
            const {user, userId} = queryParam;
            const updateData = await User.update(payload, {where: {id: userId, name: user}})
            return updateData;
          } catch (error) {
            throw error
          }
        }

        static async deleteUserById(id) {
          try {
            const deletedData = await User.destroy({where: {id}})
            return deletedData;
          } catch (error) {
            throw error
          }
        }
    }

    User.init(userSchema, {
      sequelize,
      tableName: 'user',
      modelName: 'User',
      timestamps: false
    });
    return User;
}