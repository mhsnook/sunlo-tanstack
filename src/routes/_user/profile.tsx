import { TitleBar } from '@/types/main'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { UserPen } from 'lucide-react'

export const Route = createFileRoute('/_user/profile')({
	component: ProfilePage,
	loader: () => ({
		titleBar: {
			title: `Manage your Profile`,
			Icon: UserPen,
		} as TitleBar,
	}),
})

function ProfilePage() {
	return <Outlet />
}
