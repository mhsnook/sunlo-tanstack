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
						Icon: Contact,
						link: {
							to: '/friends',
						},
					},
					{
						name: 'Search profiles',
						Icon: Handshake,
						link: {
							to: '/friends/search',
						},
					},
					{
						name: 'Invite to Sunlo',
						Icon: Send,
						link: {
							to: '/friends/invite',
						},
					},
					{
						name: 'Edit profile',
						Icon: NotebookPen,
						link: {
							to: '/profile',
						},
					},
					{
						name: 'Start a new language',
						Icon: FolderPlus,
						link: {
							to: '/learn/add-deck',
						},
					},
				],
			} as NavbarData,
		}
	},
})

function FriendsPage() {
	return <Outlet />
}
