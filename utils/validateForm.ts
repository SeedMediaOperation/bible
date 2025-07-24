import { z } from "zod";

const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export const RegisterFormSchema = z.object({
    username: z
        .string()
        .min(3, 'Username must be at least 3 characters')
        .max(30, 'Username must be at most 30 characters'),

    email: z.string().email('Invalid email address'),

    password: z
        .string()
        .regex(
            strongPasswordRegex,
            'Password must be at least 8 characters long, include uppercase, lowercase, number, and special character'
        ),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword,{
    path:['confirmPassword'],
    message: 'Passwords do not match'
})

export type RegisterFormData = z.infer<typeof RegisterFormSchema>;


export const LoginFormSchema = z.object({
    username: z
        .string()
        .min(3, 'Username must be at least 3 characters')
        .max(30, 'Username must be at most 30 characters'),

    password: z
        .string()
        .regex(
            strongPasswordRegex,
            'Password must be at least 8 characters long, include uppercase, lowercase, number, and special character'
        ),
})

export type LoginFormData = z.infer<typeof LoginFormSchema>;

export const ForgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
});

export type ForgotPasswordData = z.infer<typeof ForgotPasswordSchema>;

export const FormVersionSchema = z.object({
    titleEn: z.string(),
    titleKm: z.string()
});