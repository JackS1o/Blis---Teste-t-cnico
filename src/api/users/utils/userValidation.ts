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
  birthdate: Joi.date().required(),
  password: passwordValidation,
});

export const loginValidationSchema = Joi.object({
  email: emailValidation,
  password: passwordValidation,
});

export const createUserDocumentValidationSchema = Joi.object({
  name: Joi.string().required(),
});

export const updateUserValidationSchema = Joi.object({
  ability: Joi.string().required().messages({
    'string.empty': 'A habilidade é obrigatória.',
  }),
  years_experience: Joi.number()
    .required()
    .messages({
      'number.empty': 'O tempo de experiência é obrigatório.',
    })
    .min(0),
});

export const deleteAbilitiesValidationSchema = Joi.object({
  abilities: Joi.array().required().messages({
    'array.empty': 'As habilidades são obrigatórias.',
  }),
});
