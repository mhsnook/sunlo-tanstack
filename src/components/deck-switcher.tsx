import { ChevronsUpDown, GalleryVerticalEnd, Plus } from 'lucide-react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
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

const useDeckMenuData = () => {
	const { data, isPending, error } = useProfile()
	if (isPending) return undefined
	if (error) throw Error(error.message)
	if (!data?.deckLanguages.length) return null
	return data.deckLanguages?.map((lang) => ({
		lang,
		name: languages[lang],
		to: `/learn/$lang`,
		badge: '0' + data.decksMap[lang].cards_active,
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

	if (!lang) return null
	if (!deckMenuData) return null

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
								<GalleryVerticalEnd />
							</div>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold">
									{languages[lang]}
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
						{deckMenuData?.map((deck, index) => (
							<DropdownMenuItem key={deck.name} asChild className="gap-2 p-2">
								<Link>
									<div className="flex size-6 items-center justify-center rounded-sm border">
										{deck.badge}
									</div>
									{deck.name}
									<DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
								</Link>
							</DropdownMenuItem>
						))}
						<DropdownMenuSeparator />
						<DropdownMenuItem className="gap-2 p-2">
							<div className="flex size-6 items-center justify-center rounded-md border bg-background">
								<Plus className="size-4" />
							</div>
							<div className="font-medium text-muted-foreground">New deck</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
