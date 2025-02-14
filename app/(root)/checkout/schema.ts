import {z} from 'zod'

export const addressSchema = z.object({
  email: z.string().min(2, 'Email is Invalid').max(50).email({message: 'Email is invalid'}),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{9,14}$/, 'phoneNumber is Invalid'),
  firstName: z.string().min(2, 'First Name must contain at least 2 characters').max(50),
  lastName: z.string().min(2, 'Last Name must contain at least 2 characters').max(50),
  provinceId: z.string().min(1, 'Province is required'),
  districtId: z.string().min(1, 'District is required'),
  communeId: z.string().min(1, 'Commune is required'),
  street: z.string().min(2, 'Street must contain at least 2 characters').max(50),

})

export type CreateAddress = z.infer<typeof addressSchema>;

