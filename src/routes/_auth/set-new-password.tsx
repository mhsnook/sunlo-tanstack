import { createFileRoute } from '@tanstack/react-router'
import { CardHeader, CardTitle } from '@/components/ui/card'
import { PasswordResetForm } from '@/components/password-reset-form'

export const Route = createFileRoute('/_auth/set-new-password')({
	component: SetNewPasswordPage,
})

function SetNewPasswordPage() {
	return (
		<>
			<CardHeader>
				<CardTitle>Set your new password</CardTitle>
			</CardHeader>
			<PasswordResetForm />
		</>
	)
}
