import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { createFileRoute } from '@tanstack/react-router'
import AvatarSection from '@/components/profile/avatar-section'
import UpdateProfileForm from '@/components/profile/update-profile-form'
import UserAuthCard from '@/components/profile/user-auth-card'

export const Route = createFileRoute('/_user/profile/')({
	component: ProfilePage,
})

function ProfilePage() {
	return (
		<main className="flex flex-col gap-6 px-px">
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
