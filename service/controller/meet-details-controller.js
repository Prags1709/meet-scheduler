const { date } = require("joi");
const {User} = require("../sequelize/models");
const {MeetDetails} = require("../sequelize/models");
const MeetValidator = require('../validator/meet-validator')
const MeetDetailsPresenter = require('../presenter/meet-details-presenter');
const { includes } = require("lodash");

class MeetDetailsController {
    static async upcommingMeetList(req, res, next){
        try {
            const queryParams = req.query;
            const payload = req.body
            const filterValidation = new MeetValidator('list');
            if(!filterValidation.validate({...queryParams, ...payload})){
                res.code(400).send({ errors: filterValidation.errors });
            }else{
                const data = { ...queryParams };
                const meetData = [];
                const meetList = await MeetDetails.getUpcommingMeet(data)
                meetList.forEach((meet) => {
                    meetData.push(new MeetDetailsPresenter(meet).toJSON())
                })
                res.send({ data: meetData})
            }
        } catch (error) {
            logger.error(error)
        }
    }

    static async onGoingMeetList(req, res, next){
        try {
            const queryParams = req.query;
            const payload = req.body;
            const filterValidation = new MeetValidator('list');
            if(!filterValidation.validate({...queryParams, ...payload})){
                res.code(400).send({ errors: filterValidation.errors });
            }else{
                const data = { ...queryParams };
                const meetData = [];
                const meetList = await MeetDetails.getOnGoingMeet(data)
                meetList.forEach((meet) => {
                    meetData.push(new MeetDetailsPresenter(meet).toJSON())
                })
                res.send({ data: meetData})
            }
        } catch (error) {
            logger.error(error)
        }
    }

    static async completedMeetList(req, res, next){
        try {
            const queryParams = req.query;
            const payload = req.body
            const filterValidation = new MeetValidator('list');
            if(!filterValidation.validate({...queryParams, ...payload})){
                res.code(400).send({ errors: filterValidation.errors });
            }else{
                const data = { ...queryParams };
                const meetData = [];
                const meetList = await MeetDetails.getCompletedMeet(data)
                meetList.forEach((meet) => {
                    meetData.push(new MeetDetailsPresenter(meet).toJSON())
                })
                res.send({ data: meetData})
            }
        } catch (error) {
            logger.error(error)
        }
    }

    static async createMeet(req, res, next){
        try {
            const queryParams = req.query;
            const payload = req.body
            const filterValidation = new MeetValidator('createMeet');
            if(!filterValidation.validate({...queryParams, ...payload})){
                res.code(400).send({ errors: filterValidation.errors });
            }else{
                const data = {...payload , created_at:new Date(), updated_at:new Date()}
                await MeetDetails.scheduleMeet(data)
                res.code(201).send({message: "Meet has been Scheduled"})
            }
        } catch (error) {
            logger.error(error)
        }
    }

    static async rescheduledMeet(req, res, next){

    }

    static async deleteMeet(req, res, next){

    }

    static async joinPlay(req, res, next){
        try {
            let data = await User.findAll({
                include: [{
                    model: MeetDetails,
                    as: 'attendee',  
                    attributes: ['meet_with','attendee_id','subject', 'date'],
                    separate: true,
                  }]
            })
            res.send(data)
        } catch (error) {
            console.log(error);
            logger.error(error)
        }
    }
}

module.exports = MeetDetailsController