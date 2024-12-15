import Joi from 'joi';

const emailValidation = Joi.string().email().required().messages({
  'string.email': 'O e-mail precisa ser válido.',
  'string.empty': 'O e-mail é obrigatório.',
});

const passwordValidation = Joi.string().min(6).required().messages({
  'string.min': 'A senha precisa ter pelo menos 6 caracteres.',
  'string.empty': 'A senha é obrigatória.',
});

export const createUserValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'O nome é obrigatório.',
  }),
  email: emailValidation,
  password: passwordValidation,
});

export const loginValidationSchema = Joi.object({
  email: emailValidation,
  password: passwordValidation,
});
