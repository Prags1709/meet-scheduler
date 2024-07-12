const { isEmpty } = require('lodash');

class BaseValidator {
  constructor(type) {
    this.type = type;
    this.value = null;
    this.errors = null;
    this.isValid = null;
  }

  validate(data, schema, convert = true) {
    if (isEmpty(data)) {
      this.errors = ['empty data - nothing to validate'];
      this.isValid = false;
    } else {
      const { error, value } = schema.validate(data, { convert });
      if (error) {
        this.value = {};
        this.errors = error.details[0].message //BaseValidator.construct(error);
        this.isError = false;
      } else {
        this.value = value;
        this.errors = [];
        this.isValid = true;
      }
    }
    return this.isValid;
  }

  static construct(error) {
    return error.details.map((err) => JoiValidationError.errorParser(err));
  }
}

module.exports = BaseValidator;
