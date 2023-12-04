const { z } = require('zod');

createAdminSchema = z.object({
    name: z.string().min(2),
    email: z.string().email().min(1),
    password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/),

})

updateProfileSchema = z.object({
    name: z.string().min(2),
    email: z.string().email().min(1)
})

changePasswordSchema = z.object({
    oldPassword: z.string().min(1),
    newPassword: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/),
    confirmNewPassword: z.string().min(1)
}).refine((data)=>data.newPassword===data.confirmNewPassword, {
    message: "Password and confirm password doesn't match",
    path: 'confirmNewPassword'
})
module.exports = {createAdminSchema, updateProfileSchema, changePasswordSchema}