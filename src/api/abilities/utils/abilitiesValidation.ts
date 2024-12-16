import Joi from 'joi';

export const createAbilityValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'O nome é obrigatório.',
  }),
});

export const updateAbilityValidationSchema = Joi.object({
  active: Joi.boolean().required(),
});
