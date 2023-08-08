import * as Joi from 'joi';

export function createUserSchema(req, res, next) {

    const schema = Joi.object().keys({
        firstName: Joi.string().alphanum().min(2).max(27).required(),
        lastName: Joi.string().regex(/^[a-zA-Z0-9 -]*$/).min(2).max(27).required(),
    });
    const dataToValidate = req.body;

    //TEST
    // const dataToValidate = {
    //     firstName: 'ch',
    //     lastName: 'christofferson'
    // }
    const result = schema.validate(dataToValidate);
    if (result.error) {
        next(result.error)
        console.log(result.error);
    } else {

        console.error(result.value);
        req.body = result.value
        next();
    }
}
