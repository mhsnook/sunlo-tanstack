import { createFileRoute, Link } from '@tanstack/react-router'
import { FolderPlus, Home, Search, Star, Users } from 'lucide-react'
import { Loader } from '@/components/ui/loader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import type { NavbarData } from '@/types/main'
import { useProfile } from '@/lib/use-profile'
import { ago } from '@/lib/dayjs'
import { AppNav } from '@/components/app-nav'
import { useLinks } from '@/hooks/links'

export const Route = createFileRoute('/_user/learn/')({
	loader: () => {
		return {
			navbar: {
				title: `Learning Home`,
				subtitle: `Which deck are we studying today?`,
				Icon: Home,
				contextMenu: [
					{
						name: 'New Deck',
						link: {
							to: '/learn/add-deck',
						},
						Icon: FolderPlus,
					},
					{
						name: 'Quick search',
						link: {
							to: '/learn/quick-search',
						},
						Icon: Search,
					},
				],
			} as NavbarData,
		}
	},
	component: Page,
})

export default function Page() {
	const { data: profile, isPending } = useProfile()
	const navlinks = useLinks([
		'/learn',
		'/learn/add-deck',
		'/learn/quick-search',
	])
	return (
		<>
			<AppNav links={navlinks} />
			<main className="grid gap-4 @lg:grid-cols-2">
				{isPending ?
					<Loader />
				:	Object.entries(profile?.decksMap).map(([key, deck]) => (
						<Link
							key={key}
							to="/learn/$lang"
							params={{ lang: key }}
							className="block transition-transform rounded-lg focus:outline-blue-500 focus:ring-blue-500 focus:ring-offset-1"
						>
							<Card
								key={deck.language}
								className="overflow-hidden h-full hover:border-primary"
							>
								<CardHeader className="bg-primary text-white dark">
									<CardTitle>
										{deck.language}{' '}
										<span className="text-xs text-muted-foreground">{key}</span>
									</CardTitle>
								</CardHeader>
								<CardContent className="p-4 space-y-2">
									<div>
										<p className="text-sm text-muted-foreground">
											{deck.cards_active} active cards
										</p>
										<p className="text-sm text-muted-foreground">
											Last studied:{' '}
											{deck.most_recent_review_at ?
												ago(deck.most_recent_review_at)
											:	'never'}
										</p>
									</div>
									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-1">
											<Users className="h-4 w-4 text-info" />
											<span className="text-sm">{0} friends studying</span>
										</div>
										<div className="flex items-center space-x-1">
											<Star className="h-4 w-4 text-warning" />
											<span className="text-sm">{4.5}</span>
										</div>
									</div>
								</CardContent>
							</Card>
						</Link>
					))
				}
			</main>
		</>
	)
}
