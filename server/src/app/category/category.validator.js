const {z} = require('zod');

const categoryRequestSchema = z.object({
    cropType: z.string().min(3),
    status: z.string().regex(/active|inactive/),
    parentId: z.string().nullable()
})

module.exports = {categoryRequestSchema}