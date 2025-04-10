import Joi from 'joi';

export const eventValidationSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
            'string.base': `"Name" maydoni matn bo'lishi kerak`,
            'string.min': `"Name" kamida 3 ta belgidan iborat bo'lishi kerak`,
            'string.max': `"Name" 100 ta belgidan oshmasligi kerak`,
            'any.required': `"Name" maydoni majburiy`
        }),

    description: Joi.string()
        .max(255)
        .allow('')
        .messages({
            'string.base': `"Description" maydoni matn bo'lishi kerak`,
            'string.max': `"Description" 255 ta belgidan oshmasligi kerak`
        }),

    location: Joi.string()
        .required()
        .max(255)
        .messages({
            'string.base': `"Location" maydoni matn bo'lishi kerak`,
            'string.max': `"Location" 255 ta belgidan oshmasligi kerak`,
            'any.required': `"Location" maydoni majburiy`
        }),

    date: Joi.date()
        .iso()
        .required()
        .messages({
            'date.base': `"Date" maydoni sana bo'lishi kerak`,
            'date.iso': `"Date" to'g'ri sana formatida bo'lishi kerak (YYYY-MM-DD)`,
            'any.required': `"Date" maydoni majburiy`
        }),

    time: Joi.string()
        .regex(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .required()
        .messages({
            'string.base': `"Time" maydoni matn bo'lishi kerak`,
            'string.pattern.base': `"Time" to'g'ri vaqt formatida bo'lishi kerak (HH:MM)`,
            'any.required': `"Time" maydoni majburiy`
        }),

    total_tickets: Joi.number()
        .integer()
        .min(0)
        .required()
        .messages({
            'number.base': `"Total tickets" maydoni son bo'lishi kerak`,
            'number.integer': `"Total tickets" butun son bo'lishi kerak`,
            'number.min': `"Total tickets" 0 dan kam bo'lmasligi kerak`,
            'any.required': `"Total tickets" maydoni majburiy`
        }),

    available_tickets: Joi.number()
        .integer()
        .min(0)
        .required()
        .messages({
            'number.base': `"Available tickets" maydoni son bo'lishi kerak`,
            'number.integer': `"Available tickets" butun son bo'lishi kerak`,
            'number.min': `"Available tickets" 0 dan kam bo'lmasligi kerak`,
            'any.required': `"Available tickets" maydoni majburiy`
        }),
});