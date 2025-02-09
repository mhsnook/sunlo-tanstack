import { NavbarData } from '@/types/main'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { relationsQuery } from '@/lib/friends'
import { HeartHandshake } from 'lucide-react'
import { useLinks } from '@/hooks/links'
import { AppNav } from '@/components/app-nav'

export const Route = createFileRoute('/_user/friends')({
	component: FriendsPage,
	loader: async ({ context }) => {
		const { queryClient, userId } = context
		await queryClient.ensureQueryData(relationsQuery(userId))
		return {
			navbar: {
				title: `Manage Friends and Contacts`,
				Icon: HeartHandshake,
			} as NavbarData,
		}
	},
})

function FriendsPage() {
	const navlinks = useLinks(['/friends', '/friends/invite', '/friends/search'])
	return (
		<>
			<AppNav links={navlinks} />
			<Outlet />
		</>
	)
}
