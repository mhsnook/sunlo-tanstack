import { createFileRoute, Link } from '@tanstack/react-router'
import supabase from '@/lib/supabase-client'
import { useMutation } from '@tanstack/react-query'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/button-variants'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Callout from '@/components/ui/callout'
import SuccessCheckmark from '@/components/SuccessCheckmark'
import { ShowError } from '@/components/errors'
import { PasswordField } from '@/components/fields'

export const Route = createFileRoute('/_user/profile/change-password')({
	component: ChangePasswordPage,
})

const FormSchema = z.object({
	password: z.string().min(8, 'Password should be 8 characters at least'),
})

type FormInputs = z.infer<typeof FormSchema>

function ChangePasswordPage() {
	const changeMutation = useMutation({
		mutationKey: ['forgot-password'],
		mutationFn: async ({ password }: FormInputs) => {
			const { data, error } = await supabase.auth.updateUser({ password })
			if (error) {
				console.log(`Error`, error)
				throw error
			}
			return data
			// console.log(`form data`, email, user_role)
			// return { user: { email: '@fake email@' } }
		},
		onSuccess: () => {
			toast.success(`Successfully updated your password.`)
		},
	})

	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
	} = useForm<FormInputs>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			password: '',
		},
	})

	return (
		<>
			<CardHeader>
				<CardTitle>Change your password</CardTitle>
			</CardHeader>
			<CardContent>
				{changeMutation.isSuccess ?
					<Callout>
						<SuccessCheckmark className="bg-transparent" />
						<div className="space-y-2">
							<p>Success!</p>
							<p>You've changed your password.</p>
							<p>
								<Link to="/profile" from={Route.fullPath} className="s-link">
									Return to your profile page.
								</Link>
							</p>
						</div>
					</Callout>
				:	<form
						role="form"
						noValidate
						className="space-y-4"
						// eslint-disable-next-line @typescript-eslint/no-misused-promises
						onSubmit={handleSubmit(
							changeMutation.mutate as SubmitHandler<FormInputs>
						)}
					>
						<fieldset className="flex flex-col gap-y-4" disabled={isSubmitting}>
							<PasswordField
								register={register}
								error={errors.password}
								autoFocus
								tabIndex={1}
							/>
						</fieldset>
						<div className="flex flex-row justify-between">
							<Button disabled={changeMutation.isPending}>Submit</Button>
							<Link
								to="/profile"
								className={buttonVariants({ variant: 'link' })}
							>
								Back to profile
							</Link>
						</div>
						<ShowError show={!!changeMutation.error}>
							Problem changing password: {changeMutation.error?.message}
						</ShowError>
					</form>
				}
			</CardContent>
		</>
	)
}
