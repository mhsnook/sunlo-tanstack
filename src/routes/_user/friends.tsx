import { NavbarData } from '@/types/main'
import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router'
import { relationsQuery } from '@/lib/friends'
import { HeartHandshake } from 'lucide-react'
import { useLinks } from '@/hooks/links'
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { Link } from '@tanstack/react-router'
import { buttonVariants } from '@/components/ui/button-variants'

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
	const { pathname } = useLocation()

	const navlinks = useLinks(['/friends', '/friends/invite', '/friends/search'])
	console.log(`FullPath: ${Route.fullPath}`, Route)
	return (
		<>
			<NavigationMenu className="mb-4 w-full">
				<NavigationMenuList className="w-full">
					{navlinks.map((l) => (
						<NavigationMenuItem key={l.link.to}>
							<NavigationMenuLink key={l.link.to} asChild>
								<Link
									{...l.link}
									className={buttonVariants({
										variant: pathname === l.link.to ? 'default' : 'ghost',
									})}
								>
									<l.Icon className="size-4" /> {l.name}
								</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
					))}
				</NavigationMenuList>
			</NavigationMenu>

			<Outlet />
		</>
	)
}
