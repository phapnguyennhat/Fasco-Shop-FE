import { z } from 'zod';

export const loginSchema = z.object({
	account: z.string().min(2, 'Email or Username is required').max(50),
	password: z.string().min(2, 'Password is required').max(50),
});

export type LoginData = z.infer<typeof loginSchema>;

export const registerSchema = z
	.object({
		firstName: z.string().min(2, 'First Name is required').max(50),
		lastName: z.string().min(2, 'Last Name is required').max(50),
		username: z.string().min(2, 'Username is required').max(50),
		email: z.string().email(),
		password: z
			.string()
			.min(6, 'The password must be at least 6 characters long.')
			.max(50),
		confirmPassword: z
			.string()
			.min(6, 'The password must be at least 6 characters long.')
			.max(50),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Confirm password must match password',
		path: ['confirmPassword'], // Chỉ định lỗi hiển thị cho trường confirmPassword
    });
    

export type RegisterData = z.infer<typeof registerSchema>;


export const updatePasswordSchema = z
    .object({
        password: z.string().min(1, 'Password is required').max(50),
        new_password:  z.string().min(1, 'New password is required').max(50),
        confirm_password:  z.string().min(1, 'Confirm password is required').max(50),
    })
    .refine((data) => data.new_password === data.confirm_password, {
        message: 'Confirm password must match new password',
        path: ['confirm_password'], // Đặt lỗi tại `confirm_password`
        })

export type UpdatePasswordData = z.infer<typeof updatePasswordSchema>;