module.exports = async function (schema, fields) {
  try {
    return await schema.validate(fields);
  } catch (e) {
    console.log(e);
    throw e.errors;
  }
};
