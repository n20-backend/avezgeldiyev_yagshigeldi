import Joi from 'joi';

export const orderValidationSchema = Joi.object({
    user_id: Joi.string()
        .guid({ version: 'uuidv4' })
        .required()
        .messages({
            'string.base': `"User ID" maydoni matn bo'lishi kerak`,
            'string.guid': `"User ID" to'g'ri UUID formatida bo'lishi kerak`,
            'any.required': `"User ID" maydoni majburiy`
        }),

    tickets: Joi.array()
        .items(Joi.string().guid({ version: 'uuidv4' }))
        .min(1)
        .required()
        .messages({
            'array.base': `"Tickets" maydoni massiv bo'lishi kerak`,
            'array.min': `"Tickets" kamida 1 ta elementdan iborat bo'lishi kerak`,
            'any.required': `"Tickets" maydoni majburiy`,
            'string.base': `"Tickets" massividagi element matn bo'lishi kerak`,
            'string.guid': `"Tickets" massividagi element to'g'ri UUID formatida bo'lishi kerak`
        }),

    total_amount: Joi.number()
        .positive()
        .required()
        .messages({
            'number.base': `"Total amount" maydoni son bo'lishi kerak`,
            'number.positive': `"Total amount" musbat son bo'lishi kerak`,
            'any.required': `"Total amount" maydoni majburiy`
        }),

    currency: Joi.string()
        .valid('USD', 'EUR', 'UZS')
        .required()
        .messages({
            'string.base': `"Currency" maydoni matn bo'lishi kerak`,
            'any.required': `"Currency" maydoni majburiy`,
            'any.only': `"Currency" faqat 'USD', 'EUR' yoki 'UZS' bo'lishi mumkin`
        }),

    status: Joi.string()
        .valid('pending', 'completed', 'cancelled')
        .required()
        .messages({
            'string.base': `"Status" maydoni matn bo'lishi kerak`,
            'any.required': `"Status" maydoni majburiy`,
            'any.only': `"Status" faqat 'pending', 'completed' yoki 'cancelled' bo'lishi mumkin`
        }),
});