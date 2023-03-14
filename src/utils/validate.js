const { ValidationError } = require("yup");

module.exports = async function (schema, fields) {
  try {
    return await schema.validate(fields);
  } catch (e) {
    // console.log(e);
    throw new ValidationError(e.errors.shift());
  }
};
