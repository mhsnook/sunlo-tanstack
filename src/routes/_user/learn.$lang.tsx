import { createFileRoute, Outlet } from '@tanstack/react-router'
import { NavbarData } from '@/types/main'
import languages from '@/lib/languages'
import { languageQueryOptions } from '@/lib/use-language'
import { deckQueryOptions } from '@/lib/use-deck'
import {
	BookCopy,
	BookHeart,
	Contact,
	NotebookPen,
	Rocket,
	Search,
	Settings,
} from 'lucide-react'

export const Route = createFileRoute('/_user/learn/$lang')({
	component: LanguageLayout,
	loader: async ({
		params: { lang },
		context: {
			queryClient,
			auth: { userId },
		},
	}) => {
		const languageLoader = queryClient.ensureQueryData(
			languageQueryOptions(lang)
		)
		const deckLoader = queryClient.ensureQueryData(
			deckQueryOptions(lang, userId)
		)
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const both = { l: await languageLoader, d: await deckLoader }
		return {
			navbar: {
				title: `${languages[lang]} Deck`,
				Icon: BookHeart,
				contextMenu: [
					{
						name: 'Quick search',
						to: '/learn/$lang/search',
						params: { lang },
						Icon: Search,
					},
					{
						name: 'Start a review',
						to: '/learn/$lang/review',
						params: { lang },
						Icon: Rocket,
					},
					{
						name: `Browse ${languages[lang]} library`,
						to: '/learn/$lang/library',
						params: { lang },
						Icon: BookCopy,
					},
					{
						name: 'Add a phrase',
						to: '/learn/$lang/add-phrase',
						params: { lang },
						Icon: NotebookPen,
					},
					{
						name: 'Deck settings',
						to: '/learn/$lang/deck-settings',
						params: { lang },
						Icon: Settings,
					},
					{
						name: 'Friends and contacts',
						to: '/friends',
						Icon: Contact,
					},
				],
			} as NavbarData,
		}
	},
})

function LanguageLayout() {
	return (
		<main className="mx-auto">
			<Outlet />
		</main>
	)
}
