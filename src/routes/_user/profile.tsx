import { NavbarData } from '@/types/main'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import {
	Contact,
	FolderPlus,
	Lock,
	Mail,
	NotebookPen,
	UserPen,
} from 'lucide-react'

export const Route = createFileRoute('/_user/profile')({
	component: ProfilePage,
	loader: () => ({
		navbar: {
			title: `Manage your Profile`,
			Icon: UserPen,
			contextMenu: [
				{
					name: 'Edit profile',
					to: '/profile',
					Icon: NotebookPen,
				},
				{
					name: 'Update email',
					to: '/profile/change-email',
					Icon: Mail,
				},
				{
					name: `Update password`,
					to: '/profile/change-password',
					Icon: Lock,
				},
				{
					name: 'Friends',
					to: '/friends',
					Icon: Contact,
				},
				{
					name: 'Start a new Language',
					to: '/learn/add-deck',
					Icon: FolderPlus,
				},
			],
		} as NavbarData,
	}),
})

function ProfilePage() {
	return <Outlet />
}
