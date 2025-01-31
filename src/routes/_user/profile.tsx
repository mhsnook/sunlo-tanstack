import { NavbarData } from '@/types/main'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { UserPen } from 'lucide-react'

export const Route = createFileRoute('/_user/profile')({
	component: ProfilePage,
	loader: () => ({
		navbar: {
			title: `Manage your Profile`,
			Icon: UserPen,
		} as NavbarData,
	}),
})

function ProfilePage() {
	return <Outlet />
}
