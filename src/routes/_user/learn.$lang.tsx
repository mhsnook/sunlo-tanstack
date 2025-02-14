import { createFileRoute, Outlet } from '@tanstack/react-router'
import { NavbarData } from '@/types/main'
import languages from '@/lib/languages'
import { languageQueryOptions } from '@/lib/use-language'
import { deckQueryOptions } from '@/lib/use-deck'
import {
	BookCopy,
	BookHeart,
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
			appnav: [
				'/learn/$lang',
				'/learn/$lang/review',
				'/learn/$lang/library',
				'/learn/$lang/search',
				'/learn/$lang/add-phrase',
				'/learn/$lang/deck-settings',
			],
			navbar: {
				title: `${languages[lang]} Deck`,
				Icon: BookHeart,
				contextMenu: [
					{
						name: 'Quick search',
						link: {
							to: '/learn/$lang/search',
							params: { lang },
						},
						Icon: Search,
					},
					{
						name: 'Start a review',
						link: {
							to: '/learn/$lang/review',
							params: { lang },
						},
						Icon: Rocket,
					},
					{
						name: `Browse ${languages[lang]} library`,
						link: {
							to: '/learn/$lang/library',
							params: { lang },
						},
						Icon: BookCopy,
					},
					{
						name: 'Add a phrase',
						link: {
							to: '/learn/$lang/add-phrase',
							params: { lang },
						},
						Icon: NotebookPen,
					},
					{
						name: 'Deck settings',
						link: {
							to: '/learn/$lang/deck-settings',
							params: { lang },
						},
						Icon: Settings,
					},
				],
			} as NavbarData,
		}
	},
})

function LanguageLayout() {
	return <Outlet />
}
