import {
	BookCopy,
	ChevronRight,
	Contact,
	FolderPlus,
	GalleryHorizontal,
	GalleryHorizontalEnd,
	Handshake,
	HeartHandshake,
	NotebookPen,
	Rocket,
	School,
	Search,
	Send,
	Settings,
} from 'lucide-react'

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { MenuType } from '@/types/main'
import languages from '@/lib/languages'
import { Link, useRouterState } from '@tanstack/react-router'

const menus = (lang: string): Array<MenuType> => {
	let result: Array<MenuType> = [
		{
			name: 'Friends',
			link: { to: '/friends' },
			Icon: HeartHandshake,
			items: [
				{
					name: 'Friends home',
					link: {
						to: '/friends',
					},
					Icon: Contact,
				},
				{
					name: 'Search profiles',
					link: {
						to: '/friends/search',
					},
					Icon: Handshake,
				},
				{
					name: 'Invite to Sunlo',
					link: {
						to: '/friends/invite',
					},
					Icon: Send,
				},
				{
					name: 'Start a new language',
					link: {
						to: '/learn/add-deck',
					},
					Icon: FolderPlus,
				},
			],
		},
	]
	if (lang)
		result.unshift({
			name: 'Deck navigation',
			link: { to: '/learn' },
			Icon: GalleryHorizontalEnd,
			items: [
				{
					name: 'Start a review',
					Icon: Rocket,
					link: {
						to: '/learn/$lang/review',
						params: { lang },
					},
				},
				{
					name: 'Quick search',
					Icon: Search,
					link: {
						to: '/learn/$lang/search',
						params: { lang },
					},
				},
				{
					name: `Browse ${languages[lang]} library`,
					Icon: BookCopy,
					link: {
						to: '/learn/$lang/library',
						params: { lang },
					},
				},
				{
					name: 'Add a phrase',
					Icon: NotebookPen,
					link: {
						to: '/learn/$lang/add-phrase',
						params: { lang },
					},
				},
				{
					name: 'Deck settings',
					Icon: Settings,
					link: {
						to: '/learn/$lang/deck-settings',
						params: { lang },
					},
				},
			],
		})
	return result
}
export function NavMain({ lang }: { lang: string }) {
	const menusData = menus(lang)
	const {
		location: { pathname },
	} = useRouterState()
	const routeTreeSegment = pathname.split('/')[1]

	return (
		<SidebarGroup>
			<SidebarGroupLabel>Menu</SidebarGroupLabel>
			<SidebarMenu>
				<SidebarMenuItem>
					<SidebarMenuButton asChild>
						<Link to="/learn">
							<School />
							<span>Learning center</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>

				{menusData.map((item) => (
					<Collapsible
						key={item.name}
						asChild
						defaultOpen={routeTreeSegment === item.link.to.split('/')[1]}
						className="group/collapsible"
					>
						<SidebarMenuItem>
							<CollapsibleTrigger asChild>
								<SidebarMenuButton tooltip={item.name}>
									{item.Icon && <item.Icon />}
									<span>{item.name}</span>
									<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
								</SidebarMenuButton>
							</CollapsibleTrigger>
							<CollapsibleContent>
								<SidebarMenuSub>
									{item.items?.map((subItem) => (
										<SidebarMenuSubItem key={subItem.name}>
											<SidebarMenuSubButton asChild>
												<Link {...subItem.link}>
													<subItem.Icon />
													<span>{subItem.name}</span>
												</Link>
											</SidebarMenuSubButton>
										</SidebarMenuSubItem>
									))}
								</SidebarMenuSub>
							</CollapsibleContent>
						</SidebarMenuItem>
					</Collapsible>
				))}
			</SidebarMenu>
		</SidebarGroup>
	)
}
