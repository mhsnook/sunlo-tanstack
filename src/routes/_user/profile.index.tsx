import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { createFileRoute } from '@tanstack/react-router'
import {
	AvatarSection,
	UpdateProfileForm,
	UserAuthCard,
} from '@/components/profile'

export const Route = createFileRoute('/_user/profile/')({
	component: ProfilePage,
})

function ProfilePage() {
	return (
		<main className="px-px flex flex-col gap-6">
			<AvatarSection />

			<Card>
				<CardHeader>
					<CardTitle>Edit Profile</CardTitle>
					<CardDescription>Update your profile information</CardDescription>
				</CardHeader>
				<CardContent>
					<UpdateProfileForm />
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Login Credentials</CardTitle>
					<CardDescription>
						Update your email or password (or signin method)
					</CardDescription>
				</CardHeader>
				<CardContent>
					<UserAuthCard />
				</CardContent>
			</Card>
		</main>
	)
}
