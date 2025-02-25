import { makeLinks } from '@/hooks/links'
import OneSidebarMenu from './one-sidebar-menu'

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
const siteMenu = makeLinks(['/', '/login', '/signup', '/privacy-policy'])

export function NavMain({ lang }: { lang: string }) {
	const deckMenu = !lang ? null : makeLinks(deckLinks, lang)

	return (
		<>
			{!deckMenu ? null : (
				<OneSidebarMenu menu={deckMenu} title="Deck options" />
			)}
			<OneSidebarMenu menu={learnMenu} title="Learning center" />
			<OneSidebarMenu menu={friendsMenu} title="Friends & contacts" />
			<OneSidebarMenu menu={siteMenu} title="Site" />
		</>
	)
}
