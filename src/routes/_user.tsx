import { AppSidebarLayout } from '@/components/app-sidebar-layout'
import Navbar from '@/components/navbar'
import { profileQuery } from '@/lib/use-profile'
import { NavbarData } from '@/types/main'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { BookHeart, Contact, FolderPlus, Home, Search } from 'lucide-react'

export const Route = createFileRoute('/_user')({
	beforeLoad: ({ context, location }) => {
		// If the user is logged out, redirect them to the login page
		// console.log(`beforeLoad auth context:`, context.auth)
		if (!context.auth?.isAuth) {
			throw redirect({
				to: '/login',
				search: {
					// Use the current location to power a redirect after login
					// (Do not use `router.state.resolvedLocation` as it can
					// potentially lag behind the actual current location)
					redirectedFrom: location.href,
				},
			})
		}
		return context.auth
	},
	loader: async ({ context: { queryClient, auth } }) => {
		if (auth.userId)
			// this line is making sure the entire route tree awaits till we have the profile
			await queryClient.ensureQueryData(profileQuery(auth.userId))
		return {
			navbar: {
				title: `Learning Home`,
				subtitle: `Which deck are we studying today?`,
				Icon: Home,
				contextMenu: [
					{
						name: 'Learning center',
						to: '/learn',
						Icon: BookHeart,
					},
					{
						name: 'New Deck',
						to: '/learn/add-deck',
						Icon: FolderPlus,
					},
					{
						name: 'Quick search',
						to: '/learn/quick-search',
						Icon: Search,
					},
					{
						name: 'Friends',
						to: '/friends',
						Icon: Contact,
					},
				],
			} as NavbarData,
		}
	},
	component: UserLayout,
})

function UserLayout() {
	return (
		<AppSidebarLayout>
			<Navbar />
			<Outlet />
		</AppSidebarLayout>
	)
}
