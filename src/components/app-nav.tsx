import { Link } from '@tanstack/react-router'
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from './ui/navigation-menu'
import { buttonVariants } from './ui/button-variants'
import { LinkType } from '@/types/main'
import { useLocation } from '@tanstack/react-router'

export function AppNav({ links }: { links: Array<LinkType> }) {
	const { pathname } = useLocation()
	return (
		<NavigationMenu className="mb-4 w-full">
			<NavigationMenuList className="w-full">
				{links.map((l: LinkType) => (
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
	)
}
