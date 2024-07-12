const BaseValidator = require("./base-validator");
let Joi = require('joi');
const { isEmpty } = require('lodash');

class UserValidator extends BaseValidator {
    constructor(type){
        super();
        this.type = type
    }

    static listValidator(){
        return Joi.object({
            name: Joi.string(),
            email: Joi.string(),
            password: Joi.string(),
            role: Joi.string(),

            id: Joi.number(),
            user: Joi.string(),
            currentUser: Joi.string(),
            userId: Joi.number(),
            page: Joi.string(),
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
            schema = UserValidator.listValidator();
            break;
          }
          default:
            break;
        }
        return super.validate(data, schema);
    }
}

module.exports = UserValidator;