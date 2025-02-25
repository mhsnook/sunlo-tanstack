import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Link } from '@tanstack/react-router'
import { makeLinks } from '@/hooks/links'
import { LinkType } from '@/types/main'

const deckLinks = [
	'/learn/$lang',
	'/learn/$lang/review',
	'/learn/$lang/search',
	'/learn/$lang/library',
	'/learn/$lang/add-phrase',
	'/learn/$lang/deck-settings',
]
const friendsMenu = makeLinks([
	'/friends',
	'/friends/search',
	'/friends/invite',
])
const learnMenu = makeLinks([
	'/learn',
	'/learn/quick-search',
	'/learn/add-deck',
])

function OneMenu({ menu, title }: { menu: Array<LinkType>; title: string }) {
	return (
		<SidebarGroup>
			<SidebarGroupLabel>{title}</SidebarGroupLabel>
			<SidebarMenu>
				{menu.map((item) => (
					<SidebarMenuItem key={item.name}>
						<SidebarMenuButton asChild>
							<Link {...item.link}>
								<item.Icon />
								<span>{item.title}</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
	)
}

export function NavMain({ lang }: { lang: string }) {
	const deckMenu = !lang ? null : makeLinks(deckLinks, lang)

	return (
		<>
			{!deckMenu ? null : <OneMenu menu={deckMenu} title="Deck options" />}
			<OneMenu menu={friendsMenu} title="Friends & contacts" />
			<OneMenu menu={learnMenu} title="Learning center" />
		</>
	)
}
