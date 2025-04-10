import Joi from 'joi';

export const ticketValidationSchema = Joi.object({
    event_id: Joi.string()
        .guid({ version: 'uuidv4' })
        .required()
        .messages({
            'string.base': `"Event ID" maydoni matn bo'lishi kerak`,
            'string.guid': `"Event ID" to'g'ri UUID formatida bo'lishi kerak`,
            'any.required': `"Event ID" maydoni majburiy`
        }),

    type: Joi.string()
        .valid('standard', 'vip', 'student', 'senior')
        .required()
        .messages({
            'string.base': `"Type" maydoni matn bo'lishi kerak`,
            'any.required': `"Type" maydoni majburiy`,
            'any.only': `"Type" faqat 'standard', 'vip', 'student' yoki 'senior' bo'lishi mumkin`
        }),

    price: Joi.number()
        .positive()
        .required()
        .messages({
            'number.base': `"Price" maydoni son bo'lishi kerak`,
            'number.positive': `"Price" musbat son bo'lishi kerak`,
            'any.required': `"Price" maydoni majburiy`
        }),

    currency: Joi.string()
        .valid('USD', 'EUR', 'UZS')
        .required()
        .messages({
            'string.base': `"Currency" maydoni matn bo'lishi kerak`,
            'any.required': `"Currency" maydoni majburiy`,
            'any.only': `"Currency" faqat 'USD', 'EUR' yoki 'UZS' bo'lishi mumkin`
        }),

    seat_number: Joi.string()
        .max(50)
        .allow('') 
        .messages({
            'string.base': `"Seat number" maydoni matn bo'lishi kerak`,
            'string.max': `"Seat number" 50 ta belgidan oshmasligi kerak`
        }),

    status: Joi.string()
        .valid('available', 'booked', 'sold')
        .required()
        .messages({
            'string.base': `"Status" maydoni matn bo'lishi kerak`,
            'any.required': `"Status" maydoni majburiy`,
            'any.only': `"Status" faqat 'available', 'booked' yoki 'sold' bo'lishi mumkin`
        }),
});