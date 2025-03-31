'use client';
import { register } from '@/api/auth/action';
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
import { isErrorResponse } from '@/lib/utils';
import { RegisterData, registerSchema } from '@/schema/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { z } from 'zod';

export default function RegisterForm() {
	const form = useForm<RegisterData>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	const dispatch = useDispatch();
    const { toast } = useToast();
    const router = useRouter()

	async function onSubmit(values: RegisterData) {
		try {
			dispatch(setSpinner(true));
			const response = await register(values);
			if (isErrorResponse(response)) {
				if (response.message.includes('Email')) {
					form.setError(
						'email',
						{ message: response.message },
						{ shouldFocus: true },
					);
				}

				if (response.message.includes('Username')) {
					form.setError(
						'username',
						{ message: response.message },
						{ shouldFocus: true },
					);
				}

				toast({
					variant: 'destructive',
					title: 'Uh oh! Something went wrong.',
					description: response.message,
				});
			} else {
				toast({
					description: 'Create Account successfully.',
				});
				form.reset({
					confirmPassword: '',
					email: '',
					firstName: '',
					lastName: '',
					password: '',
					username: '',
                });

                router.replace('/')
                
			}
		} catch (error: any) {
			toast({
				variant: 'destructive',
				title: 'Uh oh! Something went wrong.',
			});
		}
		dispatch(setSpinner(false));
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className=" grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2   mb-[40px]"
			>
				<div className=" md:col-span-2 grid grid-cols-2 gap-x-2 md:gap-x-4 gap-y-2 ">
					{' '}
					<FormField
						control={form.control}
						name="firstName"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<input
										type="text"
										className=" px-4 outline-none  w-full border-b-2 py-2"
										placeholder="First Name"
										{...field}
									/>
								</FormControl>

								{/* <FormMessage className=" px-4" /> */}
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="lastName"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<input
										type="text"
										className=" px-4 outline-none  w-full border-b-2 py-2"
										placeholder="Last Name"
										{...field}
									/>
								</FormControl>

								{/* <FormMessage className=" px-4" /> */}
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<input
									type="text"
									className=" px-4 outline-none  w-full border-b-2 py-2"
									placeholder="Username"
									{...field}
								/>
							</FormControl>

							{/* <FormMessage className=" px-4" /> */}
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<input
									type="email"
									className=" px-4 outline-none  w-full border-b-2 py-2"
									placeholder="Email"
									{...field}
								/>
							</FormControl>

							{/* <FormMessage className=" px-4" /> */}
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<input
									type="password"
									className=" px-4 outline-none  w-full border-b-2 py-2"
									placeholder="Password"
									{...field}
								/>
							</FormControl>

							{/* <FormMessage className=" px-4" /> */}
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

							{/* <FormMessage className=" px-4" /> */}
						</FormItem>
					)}
				/>

				<div className="  md:col-span-2 flex justify-center flex-col  items-center pt-4">
					<button
						className=" button-black mb-[20px]  min-h-[48px]  font-semibold w-[80%] "
						type="submit"
					>
						Create Account
					</button>

					<p>
						Already have an account?{' '}
						<Link className=" text-blue-500" href={'/login'}>
							Login
						</Link>
					</p>
				</div>
			</form>
		</Form>
	);
}
