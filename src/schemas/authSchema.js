import joi from 'joi';

export const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
  });
  
export const signUpSchema = joi.object({
	username: joi.string().required(),
  pictureUrl: joi.string().uri().required(),
	email: joi.string().email().required(),
	password: joi.string().required(),
	confirmPassword: joi.string().valid(joi.ref("password")).required()
})

  