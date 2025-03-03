import { Link, useMatches } from '@tanstack/react-router'
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from './ui/navigation-menu'
import { LinkType } from '@/types/main'
import { useLinks } from '@/hooks/links'
import { ScrollArea, ScrollBar } from './ui/scroll-area'

export function AppNav() {
	const matches = useMatches()
	if (matches.some((match) => match.status === 'pending')) return null
	return <Nav matches={matches} />
}

function Nav({ matches }: { matches: ReturnType<typeof useMatches> }) {
	const match = matches.findLast((m) => !!m?.loaderData?.appnav)
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
									className="border-b-2 flex flex-row gap-2 items-center justify-center py-2"
									activeProps={{ className: 'border-primary text-foreground' }}
									activeOptions={{ exact: true }}
									inactiveProps={{
										className: 'border-transparent text-muted-foreground',
									}}
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
