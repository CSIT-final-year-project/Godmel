const { z } = require('zod');

const seedSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    category: z.string().min(1),
    countInStock: z.string().default(0),
    price: z.string().default(0)
})

const commentSchema = z.object({
    comment: z.string().max(100)
})

const lendMachineSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    target_plant: z.string().min(1),
    machine_power: z.string().min(1),
    price: z.string().default(0),
    quantity: z.string().default(0)
})

const consumerProductSchema = z.object({
    prod_name: z.string().min(1),
    price: z.string().min(1),
    prod_size: z.string().min(1),
    quantity: z.string().default(0),
    price: z.string().default(0)
})

module.exports = {seedSchema, commentSchema, lendMachineSchema, consumerProductSchema}