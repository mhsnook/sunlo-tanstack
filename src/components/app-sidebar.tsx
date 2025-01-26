import type * as React from 'react'
import {
	AudioWaveform,
	BookOpen,
	Bot,
	Command,
	Frame,
	GalleryVerticalEnd,
	Map,
	PieChart,
	Settings2,
	SquareTerminal,
} from 'lucide-react'

import { NavMain } from './nav-main'
import { NavProjects } from './nav-projects'
import { NavUser } from './nav-user'
import { TeamSwitcher } from './team-switcher'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from '@/components/ui/sidebar'
import { MenuType } from '@/types/main'
import { useProfile } from '@/lib/use-profile'
import languages from '@/lib/languages'
import Callout from './ui/callout'
import { Button } from './ui/button'
import { Link } from '@tanstack/react-router'

// This is real data:
const staticMenu: MenuType = {
	name: 'Menu',
	to: '/',
	links: [
		{
			name: 'Home',
			to: '/',
		},
		{
			name: 'Log in',
			to: '/login',
		},
		{
			name: 'Sign up',
			to: '/signup',
		},
		{
			name: 'Privacy Policy',
			to: '/privacy-policy',
		},
	],
}

// This is sample data.
const data = {
	user: {
		name: 'shadcn',
		email: 'm@example.com',
		avatar: '/avatars/shadcn.jpg',
	},
	teams: [
		{
			name: 'Acme Inc',
			logo: GalleryVerticalEnd,
			plan: 'Enterprise',
		},
		{
			name: 'Acme Corp.',
			logo: AudioWaveform,
			plan: 'Startup',
		},
		{
			name: 'Evil Corp.',
			logo: Command,
			plan: 'Free',
		},
	],
	navMain: [
		{
			title: 'Playground',
			url: '#',
			icon: SquareTerminal,
			isActive: true,
			items: [
				{
					title: 'History',
					url: '#',
				},
				{
					title: 'Starred',
					url: '#',
				},
				{
					title: 'Settings',
					url: '#',
				},
			],
		},
		{
			title: 'Models',
			url: '#',
			icon: Bot,
			items: [
				{
					title: 'Genesis',
					url: '#',
				},
				{
					title: 'Explorer',
					url: '#',
				},
				{
					title: 'Quantum',
					url: '#',
				},
			],
		},
		{
			title: 'Documentation',
			url: '#',
			icon: BookOpen,
			items: [
				{
					title: 'Introduction',
					url: '#',
				},
				{
					title: 'Get Started',
					url: '#',
				},
				{
					title: 'Tutorials',
					url: '#',
				},
				{
					title: 'Changelog',
					url: '#',
				},
			],
		},
		{
			title: 'Settings',
			url: '#',
			icon: Settings2,
			items: [
				{
					title: 'General',
					url: '#',
				},
				{
					title: 'Team',
					url: '#',
				},
				{
					title: 'Billing',
					url: '#',
				},
				{
					title: 'Limits',
					url: '#',
				},
			],
		},
	],
	projects: [
		{
			name: 'Design Engineering',
			url: '#',
			icon: Frame,
		},
		{
			name: 'Sales & Marketing',
			url: '#',
			icon: PieChart,
		},
		{
			name: 'Travel',
			url: '#',
			icon: Map,
		},
	],
}

const useDeckMenu = () => {
	const { data } = useProfile()
	if (!data) return undefined
	if (!data.deckLanguages.length) return null
	return {
		name: 'Learning decks',
		to: '/learn',
		links: data.deckLanguages?.map((lang) => {
			return {
				name: languages[lang],
				to: `/learn/$lang`,
				params: { lang },
			}
		}),
	}
}
function NoDecks() {
	return (
		<Callout>
			<div>
				<p>It seems like you're not learning any languages yet! Get started.</p>
				<Button className="w-full mt-2" asChild>
					<Link to="/learn/add-deck">Start Learning</Link>
				</Button>
			</div>
		</Callout>
	)
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const deckData = useDeckMenu()
	return (
		<Sidebar collapsible="icon" variant="floating" {...props}>
			<SidebarHeader>
				<TeamSwitcher teams={data.teams} />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavProjects projects={data.projects} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}
