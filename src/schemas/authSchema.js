import joi from 'joi';

export const signInSchema = joi.object({
    email: joi.string().email().required().trim(),
    password: joi.string().required()
  });
  
export const signUpSchema = joi.object({
	username: joi.string().required().trim(),
  pictureUrl: joi.string().uri().required().trim(),
	email: joi.string().email().required().trim(),
	password: joi.string().required(),
	confirmPassword: joi.ref("password")
})

  