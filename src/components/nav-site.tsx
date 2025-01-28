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
		to: '/',
		Icon: Home,
	},
	{
		name: 'Log in',
		to: '/login',
		Icon: LogIn,
	},
	{
		name: 'Sign up',
		to: '/signup',
		Icon: UserPlus,
	},
	{
		name: 'Privacy Policy',
		to: '/privacy-policy',
		Icon: FileText,
	},
]

export function NavSite() {
	return (
		<SidebarGroup className="group-data-[collapsible=icon]:hidden">
			<SidebarGroupLabel>Site</SidebarGroupLabel>
			<SidebarMenu>
				{staticMenu.map((item) => (
					<SidebarMenuItem key={item.to}>
						<SidebarMenuButton asChild>
							<Link to={item.to}>
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
