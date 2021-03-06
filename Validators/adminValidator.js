const Joi = require('joi');

module.exports = (checks, data) => {

    let check = { };
    let checkList = {
        email: Joi.string().email().required(),
        password : Joi.string().min(8).required(),
        
        mobileNumber : Joi.string().required(),
        title : Joi.string().valid('Mr', 'Mrs', 'Ms'),
        firstName : Joi.string().min(3).required(),
        lastName : Joi.string().required(),
        newPassword: Joi.string().min(8).required(),
        username : Joi.string().email().required(),
        salt : Joi.string().required()
    }

    checks.split(' ').forEach(key => {
        let trimmedKey = key.trim();

        if(trimmedKey && checkList[trimmedKey]) {
            check[`${trimmedKey}`] = checkList[`${trimmedKey}`];
        }
    });

    const schema = Joi.object(check);

    const { error } = schema.validate(data);

    if (error) {
        return false;
}
    return true;
}
