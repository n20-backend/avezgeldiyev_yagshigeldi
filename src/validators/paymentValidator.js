import Joi from 'joi';

export const paymentValidationSchema = Joi.object({
    order_id: Joi.string()
        .guid({ version: 'uuidv4' })
        .required()
        .messages({
            'string.base': `"Order ID" maydoni matn bo'lishi kerak`,
            'string.guid': `"Order ID" to'g'ri UUID formatida bo'lishi kerak`,
            'any.required': `"Order ID" maydoni majburiy`
        }),

    amount: Joi.number()
        .positive()
        .required()
        .messages({
            'number.base': `"Amount" maydoni son bo'lishi kerak`,
            'number.positive': `"Amount" musbat son bo'lishi kerak`,
            'any.required': `"Amount" maydoni majburiy`
        }),

    method: Joi.string()
        .valid('credit_card', 'bank_transfer', 'paypal')
        .required()
        .messages({
            'string.base': `"Method" maydoni matn bo'lishi kerak`,
            'any.required': `"Method" maydoni majburiy`,
            'any.only': `"Method" faqat 'credit_card', 'bank_transfer' yoki 'paypal' bo'lishi mumkin`
        }),

    status: Joi.string()
        .valid('pending', 'completed', 'failed')
        .required()
        .messages({
            'string.base': `"Status" maydoni matn bo'lishi kerak`,
            'any.required': `"Status" maydoni majburiy`,
            'any.only': `"Status" faqat 'pending', 'completed' yoki 'failed' bo'lishi mumkin`
        }),

    transaction_id: Joi.string()
        .max(255)
        .allow('')
        .messages({
            'string.base': `"Transaction ID" maydoni matn bo'lishi kerak`,
            'string.max': `"Transaction ID" 255 ta belgidan oshmasligi kerak`
        }),
});