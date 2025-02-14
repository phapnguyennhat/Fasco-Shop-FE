import {z} from 'zod'

export const profileSchema = z.object({
  name:z.string().min(3, 'Name must contain at least 3 characters').max(10),
  email: z.string().min(2, 'Email is Invalid').max(50).email({message: 'Email is invalid'}),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{9,14}$/, 'Phone number is Invalid'),
  gender: z.string().min(1, 'Gender is required'),
  birthday: z.string().min(1,'Birthday is required').refine((val) => {
    const [year, month, day] = val.split("-").map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    const minBirthDate = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());

    return birthDate <= minBirthDate;
  }, { message: "You must be at least 16 years old" })
})

export type UpdateProfile = z.infer<typeof profileSchema>;