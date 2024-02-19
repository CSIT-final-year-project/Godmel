const { z } = require('zod');

const ProductValidatorSchema = z.object({
    title: z.string().min(2),
    summary: z.string().nullable(),
    price: z.string().regex(/^\d+$/).min(1),
    discount: z.string().regex(/^\d+$/).min(0).max(99).nullable(),
    status: z.string().regex(/active|inactive/).default('inactive')
})
const productReviewSchema = z.object({
    comment: z.string().max(100),
    rating: z.string().regex(/^\d+$/)
})

module.exports = {ProductValidatorSchema, productReviewSchema}