import { useProfile } from '@/lib/use-profile'
import Avatar from '@/components/avatar'

export default function AvatarSection() {
	const { data: profile } = useProfile()

	return (
		<header className="mx-auto my-4 max-w-sm text-center">
			<div className="relative">
				{profile?.avatar_url && (
					<label
						className="bg-foreground/20 mx-auto mb-2 flex size-36 flex-row justify-center rounded-full shadow-lg"
						htmlFor="single"
					>
						<Avatar size={144} />
					</label>
				)}
			</div>
			<div>
				<h2 className="text-4xl">Hello {profile?.username} 👋</h2>
			</div>
		</header>
	)
}
