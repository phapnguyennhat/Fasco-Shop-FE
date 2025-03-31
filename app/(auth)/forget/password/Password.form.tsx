'use client';

import { z } from 'zod';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

import { useToast } from '@/hooks/use-toast';
import { setSpinner } from '@/lib/features/spinner/spinnerSlice';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { delay, isErrorResponse } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { resetPassword } from '@/API/auth/action';

const formSchema = z
	.object({
		password: z.string().min(1, 'Password is required'),
		confirmPassword: z.string().min(1, 'Confirm Password is required'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Confirm password must match new password',
		path: ['confirmPassword'],
	});
export default function PasswordForm() {
	const dispatch = useDispatch();
	const { toast } = useToast();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			password: '',
			confirmPassword: '',
		},
	});

	const router = useRouter();

	async function onSubmit(values: z.infer<typeof formSchema>) {
		dispatch(setSpinner(true));
		const response = await resetPassword(values.password);
		if (isErrorResponse(response)) {
			if (response.message.includes('Password')) {
				form.setError('password', { message: response.message });
			}
		} else {
			form.reset({
				password: '',
				confirmPassword: '',
			});
			toast({
				description: 'Reset  pasword successfully.',
			});
			await delay(1000);
			router.replace('/login');
		}
		dispatch(setSpinner(false));
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="  mb-[40px] space-y-2"
			>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<input
									type="password"
									className=" px-4 outline-none  w-full border-b-2 py-2"
									placeholder="New Password"
									{...field}
								/>
							</FormControl>

							<FormMessage className=" px-4" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<input
									type="password"
									className=" px-4 outline-none  w-full border-b-2 py-2"
									placeholder="Confirm Password"
									{...field}
								/>
							</FormControl>

							<FormMessage className=" px-4" />
						</FormItem>
					)}
				/>

				<div className=" flex justify-center flex-col  items-center pt-4">
					<button
						className=" rounded-[8px] px-4 py-2 bg-[#5B86E5] hover:bg-blue-400 text-white mb-[20px] text-sm md:text-base  min-h-[48px]  font-semibold w-[80%] "
						type="submit"
					>
						Submit
					</button>
				</div>
			</form>
		</Form>
	);
}
