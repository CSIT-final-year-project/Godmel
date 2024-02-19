const { z } = require('zod');

const SeedValidatorSchema = z.object({
    title: z.string().min(2),
    summary: z.string().nullable(),
    price: z.string().regex(/^\d+$/).min(1),
    discount: z.string().regex(/^\d+$/).min(0).max(99).nullable(),
    tags: z.string().nullable(),
    status: z.string().regex(/active|inactive/).default('inactive')
})

module.exports = {SeedValidatorSchema}