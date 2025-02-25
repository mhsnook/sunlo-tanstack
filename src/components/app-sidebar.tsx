import type { ComponentProps } from 'react'
import { NavMain } from './nav-main'
import { NavUser } from './nav-user'
import { DeckSwitcher } from './deck-switcher'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from '@/components/ui/sidebar'
import { useParams } from '@tanstack/react-router'
import { ModeToggle } from './mode-toggle'

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
	const { lang } = useParams({ strict: false })
	return (
		<Sidebar collapsible="icon" variant="floating" {...props}>
			<SidebarHeader>
				<DeckSwitcher lang={lang} />
			</SidebarHeader>
			<SidebarContent>
				<NavMain lang={lang} />
			</SidebarContent>
			<SidebarFooter>
				<ModeToggle />
				<NavUser />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}
