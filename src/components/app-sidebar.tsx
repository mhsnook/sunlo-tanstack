import type * as React from 'react'

import { NavMain } from './nav-main'
import { NavSite } from './nav-site'
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


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { lang } = useParams({ strict: false })
	return (
		<Sidebar collapsible="icon" variant="floating" {...props}>
			<SidebarHeader>
				<DeckSwitcher lang={lang} />
			</SidebarHeader>
			<SidebarContent>
				<NavMain lang={lang} />
				<NavSite />
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}
