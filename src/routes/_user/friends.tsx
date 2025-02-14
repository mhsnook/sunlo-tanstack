import { NavbarData } from '@/types/main'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { relationsQuery } from '@/lib/friends'
import { HeartHandshake } from 'lucide-react'

export const Route = createFileRoute('/_user/friends')({
	component: FriendsPage,
	loader: async ({ context }) => {
		const { queryClient, userId } = context
		await queryClient.ensureQueryData(relationsQuery(userId))
		return {
			titleBar: {
				title: `Manage Friends and Contacts`,
				Icon: HeartHandshake,
			} as NavbarData,
			appnav: ['/friends', '/friends/invite', '/friends/search'],
		}
	},
})

function FriendsPage() {
	return <Outlet />
}
