import Joi from 'joi';

export const userValidationSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.base': `"Email" maydoni matn bo'lishi kerak`,
      'string.email': `"Email" to'g'ri formatda bo'lishi kerak`,
      'any.required': `"Email" maydoni majburiy`
    }),
  
  username: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.base': `"Username" maydoni matn bo'lishi kerak`,
      'string.min': `"Username" kamida 3 ta belgidan iborat bo'lishi kerak`,
      'string.max': `"Username" 30 ta belgidan oshmasligi kerak`,
      'any.required': `"Username" maydoni majburiy`
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.base': `"Password" maydoni matn bo'lishi kerak`,
      'string.min': `"Password" kamida 6 ta belgidan iborat bo'lishi kerak`,
      'any.required': `"Password" maydoni majburiy`
    }),

  role: Joi.string()
    .valid('admin', 'user', 'guest')
    .required()
    .messages({
      'string.base': `"Role" maydoni matn bo'lishi kerak`,
      'any.required': `"Role" maydoni majburiy`,
      'any.only': `"Role" faqat 'admin', 'user', yoki 'guest' bo'lishi mumkin`
    }),

  status: Joi.string()
    .valid('active', 'inactive')
    .required()
    .messages({
      'string.base': `"Status" maydoni matn bo'lishi kerak`,
      'any.required': `"Status" maydoni majburiy`,
      'any.only': `"Status" faqat 'active' yoki 'inactive' bo'lishi mumkin`
    }),
});
