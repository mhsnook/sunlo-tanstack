import { Link } from '@tanstack/react-router'
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from './ui/navigation-menu'
import { LinkType } from '@/types/main'
import { useLocation } from '@tanstack/react-router'
import { cn } from '@/lib/utils'

export function AppNav({ links }: { links: Array<LinkType> }) {
	const { pathname } = useLocation()
	return (
		<NavigationMenu className="mb-4">
			<NavigationMenuList className="w-full flex flex-row">
				{links.map((l: LinkType) => (
					<NavigationMenuItem
						className="px-4 rounded hover:bg-primary/20"
						key={l.link.to}
					>
						<NavigationMenuLink asChild>
							<Link
								{...l.link}
								className={cn(
									'border-b-2 flex flex-row gap-2 items-center justify-center py-2',
									pathname === l.link.to ?
										'border-primary'
									:	'border-transparent'
								)}
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
