const { z } = require('zod');

bannerSchema = z.object({
    title: z.string().min(2),
    url: z.union([z.literal(""), z.string().trim().url("Eg. https://godmel.com")]),
    status: z.string().regex(/active|inactive/).default('inactive')
})

module.exports = {bannerSchema}