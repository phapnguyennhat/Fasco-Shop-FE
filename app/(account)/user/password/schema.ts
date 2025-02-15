import { z } from 'zod';

export const passwordSchema = z
    .object({
        password: z.string().min(1, 'Password is required').max(50),
        new_password:  z.string().min(1, 'New password is required').max(50),
        confirm_password:  z.string().min(1, 'Confirm password is required').max(50),
    })
    .refine((data) => data.new_password === data.confirm_password, {
        message: 'Confirm password must match new password',
        path: ['confirm_password'], // Đặt lỗi tại `confirm_password`
        })

export type UpdatePassword = z.infer<typeof passwordSchema>;
