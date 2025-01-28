import { FileText, Home, LogIn, UserPlus } from 'lucide-react'
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar'
import { LinkType } from '@/types/main'
import { Link } from '@tanstack/react-router'

const staticMenu: Array<LinkType> = [
	{
		name: 'Home',
		link: {
			to: '/',
		},
		Icon: Home,
	},
	{
		name: 'Log in',
		link: {
			to: '/login',
		},
		Icon: LogIn,
	},
	{
		name: 'Sign up',
		link: {
			to: '/signup',
		},
		Icon: UserPlus,
	},
	{
		name: 'Privacy policy',
		link: {
			to: '/privacy-policy',
		},
		Icon: FileText,
	},
]

export function NavSite() {
	return (
		<SidebarGroup className="group-data-[collapsible=icon]:hidden">
			<SidebarGroupLabel>Site</SidebarGroupLabel>
			<SidebarMenu>
				{staticMenu.map((item) => (
					<SidebarMenuItem key={item.link.to}>
						<SidebarMenuButton asChild>
							<Link to={item.link.to}>
								<item.Icon />
								<span>{item.name}</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
	)
}
