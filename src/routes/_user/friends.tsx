import { NavbarData } from '@/types/main'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { relationsQuery } from '@/lib/friends'
import {
	Contact,
	FolderPlus,
	Handshake,
	HeartHandshake,
	NotebookPen,
	Send,
} from 'lucide-react'

export const Route = createFileRoute('/_user/friends')({
	component: FriendsPage,
	loader: async ({ context }) => {
		const { queryClient, userId } = context
		await queryClient.ensureQueryData(relationsQuery(userId))
		return {
			navbar: {
				title: `Manage Friends and Contacts`,
				Icon: HeartHandshake,
				contextMenu: [
					{
						name: 'Friends and contacts',
						to: '/friends',
						Icon: Contact,
					},
					{
						name: 'Search profiles',
						to: '/friends/search',
						Icon: Handshake,
					},
					{
						name: 'Invite to Sunlo',
						to: '/friends/invite',
						Icon: Send,
					},
					{
						name: 'Edit profile',
						to: '/profile',
						Icon: NotebookPen,
					},
					{
						name: 'Start a new language',
						to: '/learn/add-deck',
						Icon: FolderPlus,
					},
				],
			} as NavbarData,
		}
	},
})

function FriendsPage() {
	return <Outlet />
}
