import { Link, useMatches } from '@tanstack/react-router'
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from './ui/navigation-menu'
import { LinkType } from '@/types/main'
import { useLocation } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { useLinks } from '@/hooks/links'
import { ScrollArea, ScrollBar } from './ui/scroll-area'

export function AppNav() {
	const { pathname } = useLocation()
	const matches = useMatches()
	if (!pathname || matches.some((match) => match.status === 'pending'))
		return null
	return <Nav pathname={pathname} matches={matches} />
}

function Nav({
	pathname,
	matches,
}: {
	pathname: string
	matches: ReturnType<typeof useMatches>
}) {
	const exactMatch = matches.at(-1)
	const match = matches.findLast((m) => !!m?.loaderData?.appnav)
	console.log(`This is the match`, match)
	const links = useLinks(match?.loaderData.appnav)
	if (!links || !links.length) return null
	return (
		<ScrollArea>
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
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	)
}
