import { createFileRoute } from '@tanstack/react-router'
import { CardHeader, CardTitle } from '@/components/ui/card'
import { PasswordResetForm } from '@/components/password-reset-form'

export const Route = createFileRoute('/_user/profile/change-password')({
	component: ChangePasswordPage,
})

function ChangePasswordPage() {
	return (
		<>
			<CardHeader>
				<CardTitle>Change your password</CardTitle>
			</CardHeader>
			<PasswordResetForm />
		</>
	)
}
