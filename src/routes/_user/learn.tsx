import { NavbarData } from '@/types/main'
import { createFileRoute, Outlet } from '@tanstack/react-router'

import { Home } from 'lucide-react'

export const Route = createFileRoute('/_user/learn')({
	component: () => <LearnLayout />,
	loader: () => {
		return {
			navbar: {
				title: `Learning Home`,
				subtitle: `Which deck are we studying today?`,
				Icon: Home,
			} as NavbarData,
		}
	},
})

function LearnLayout() {
	return <Outlet />
}
