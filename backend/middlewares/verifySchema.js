const verifySchema = (req, res, next, schema) => {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true, // remove unknown props
    };
    const { error, value } = schema.validate(req.body, options);
    if(error) {
        res.statusCode = 422;
        next(`Validation Error: ${error.details.map(x => x.message).join(', ')}`);
    }
    else {
        req.body = value;
        next();
    }
}
module.exports = verifySchema;