const { Model, Op } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const meetDetailsSchema = require('./schema/meet-details')(DataTypes)

    class MeetDetails extends Model {
        static associate(models) {
            this.belongsTo(models.User, {
              foreignKey: 'id',
              as: 'user',
              onDelete: 'CASCADE',
            });
        }

        static async getUpcommingMeet(data= {}){
            try {
                const currentDate = new Date();
                const currentTime = currentDate.toTimeString().slice(0, 8);
                const {username, id} = data;
                const meetList = await MeetDetails.findAll({
                    where: {
                        date: {
                            [Op.gte]: currentDate.toISOString().split('T')[0] 
                          },
                        [Op.and] : [
                            {startTime: {[Op.gte] : currentTime}},
                            {endTime: {[Op.gte] : currentTime}}
                        ],
                        [Op.not] : [
                            {startTime: {[Op.lte] : currentTime}},
                            {endTime: {[Op.gte] : currentTime}}
                        ],
                        [Op.or] : [
                            {created_by: {[Op.eq] : username}},
                            {creater_id: {[Op.eq] : id}},
                            {meet_with: {[Op.eq] : username}},
                            {attendee_id: {[Op.eq] : id}},
                        ],
                        
                    },
                    order: [
                        ['date', 'ASC'],
                        ['startTime', 'ASC']
                    ]
                });
                return meetList;
            } catch (error) {
                throw error
            }
        }

        static async getOnGoingMeet(data = {}){
            try {
                const currentDate = new Date();
                const currentTime = currentDate.toTimeString().slice(0, 8);
                console.log(currentTime);
                const {username, id} = data;
                const meetList = await MeetDetails.findAll({
                    where: {
                        date: {
                            [Op.gte]: currentDate.toISOString().split('T')[0] 
                          },
                        [Op.and] : [
                            //{date : {[Op.eq] : currentDate.toISOString().split('T')[0]}},
                            {startTime: {[Op.lte] : currentTime}},
                            {endTime: {[Op.gte] : currentTime}}
                        ],
                        [Op.or] : [
                            {created_by: {[Op.eq] : username}},
                            {creater_id: {[Op.eq] : id}},
                            {meet_with: {[Op.eq] : username}},
                            {attendee_id: {[Op.eq] : id}},
                        ],
                        
                    },
                    order: [
                        ['date', 'ASC'],
                        ['startTime', 'ASC']
                    ]
                });
                return meetList;
            } catch (error) {
                throw error
            }
        }

        static async getCompletedMeet(data= {}){
            try {
                const currentDate = new Date();
                const currentTime = currentDate.toTimeString().slice(0, 8);
                const {username, id} = data;
                const meetList = await MeetDetails.findAll({
                    where: {
                        date: {
                            [Op.lte]: currentDate.toISOString().split('T')[0] 
                          },
                        [Op.or] : [
                            {startTime: {[Op.lt] : currentTime}},
                            {endTime: {[Op.lt] : currentTime}}
                        ],
                        [Op.or] : [
                            {created_by: {[Op.eq] : username}},
                            {creater_id: {[Op.eq] : id}},
                            {meet_with: {[Op.eq] : username}},
                            {attendee_id: {[Op.eq] : id}},
                        ],
                        
                    },
                    order: [
                        ['date', 'ASC'],
                        ['startTime', 'ASC']
                    ]
                });
                return meetList;
            } catch (error) {
                throw error
            }
        }

        static async scheduleMeet(data = {}){
            try {
                let scheduledata = await MeetDetails.create(data);
                return scheduledata;
            } catch (error) {
                throw error
            }
        }
    }

    MeetDetails.init(meetDetailsSchema, {
        sequelize,
        tableName: 'meet-details',
        modelName: 'MeetDetails',
        timestamps: false
    });
    return MeetDetails;
}