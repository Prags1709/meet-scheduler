const BaseValidator = require("./base-validator");
let Joi = require('joi');
const { isEmpty } = require('lodash');

class MeetValidator extends BaseValidator {
    constructor(type){
        super();
        this.type = type
    }

    static listValidator(){
        return Joi.object({
            created_by: Joi.string(),
            creater_id: Joi.number(),
            meet_with: Joi.string(),
            attendee_id: Joi.number(),
            subject: Joi.string(),
            date: Joi.date().iso(),
            startTime: Joi.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
            endTime: Joi.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),

            id: Joi.number(),
            user: Joi.string(),
            username: Joi.string(),
            userId: Joi.number(),
            page: Joi.string(),
        })
    }

    static createMeetValidator(){
        return Joi.object({
            created_by: Joi.string().required(),
            creater_id: Joi.number().required(),
            meet_with: Joi.string().required(),
            attendee_id: Joi.number().required(),
            subject: Joi.string().required(),
            date: Joi.date().iso().required(),
            startTime: Joi.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/).required(),
            endTime: Joi.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/).required(),
        })
    }

    validate(data) {
        if (isEmpty(data)) {
          this.errors = [];
          return true;
        }
        let schema;
        switch (this.type) {
          case 'list': {
            schema = MeetValidator.listValidator();
            break;
          }
          case 'createMeet': {
            schema = MeetValidator.createMeetValidator();
            break;
          }
          default:
            break;
        }
        return super.validate(data, schema);
    }
}

module.exports = MeetValidator;