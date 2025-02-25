import { ChevronsUpDown, GalleryHorizontalEnd, Plus } from 'lucide-react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	// DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@/components/ui/sidebar'
import { useProfile } from '@/lib/use-profile'
import languages from '@/lib/languages'
import Callout from './ui/callout'
import { Button } from './ui/button'
import { Link } from '@tanstack/react-router'
import { Badge } from './ui/badge'

const useDeckMenuData = () => {
	const { data, isPending, error } = useProfile()
	if (isPending) return undefined
	if (error) throw Error(error.message)
	if (!data?.deckLanguages.length) return null
	return data.deckLanguages?.map((lang) => ({
		lang,
		name: languages[lang],
		to: `/learn/$lang`,
		badge: data.decksMap[lang].cards_active + data.decksMap[lang].cards_learned,
		params: { lang },
	}))
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

export function DeckSwitcher({ lang }: { lang: string }) {
	const { isMobile } = useSidebar()
	const deckMenuData = useDeckMenuData()
	if (deckMenuData === undefined) return null

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				{deckMenuData === null ?
					<NoDecks />
				:	<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton
								size="lg"
								className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
							>
								<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
									<GalleryHorizontalEnd />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">
										{!lang ? 'Choose a deck' : languages[lang]}
									</span>
								</div>
								<ChevronsUpDown className="ml-auto" />
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
							align="start"
							side={isMobile ? 'bottom' : 'right'}
							sideOffset={4}
						>
							<DropdownMenuLabel className="text-xs text-muted-foreground">
								Decks
							</DropdownMenuLabel>
							{deckMenuData?.map((deck) => (
								<DropdownMenuItem
									key={deck.name}
									asChild
									className="gap-2 p-2 justify-between cursor-pointer"
								>
									<Link to="/learn/$lang" params={{ lang: deck.lang }}>
										{deck.name}
										<Badge variant="outline">{deck.badge} cards</Badge>
										{/*<DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>*/}
									</Link>
								</DropdownMenuItem>
							))}
							<DropdownMenuSeparator />
							<DropdownMenuItem asChild className="gap-2 p-2 cursor-pointer">
								<Link to="/learn/add-deck">
									<div className="flex size-6 items-center justify-center rounded border bg-background">
										<Plus className="size-4" />
									</div>
									<div className="font-medium text-muted-foreground">
										New deck
									</div>
								</Link>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				}
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
