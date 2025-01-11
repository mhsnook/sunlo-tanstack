import { createFileRoute, Outlet } from '@tanstack/react-router'
import { NavbarData } from '@/types/main'
import languages from '@/lib/languages'
import { languageQueryOptions } from '@/lib/use-language'
import { deckQueryOptions } from '@/lib/use-deck'

export const Route = createFileRoute('/learn/$lang')({
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
				icon: 'book-heart',
				contextMenu: [
					{
						name: 'Quick search',
						to: '/learn/$lang/search',
						params: { lang },
						icon: 'search',
					},
					{
						name: 'Start a review',
						to: '/learn/$lang/review',
						params: { lang },
						icon: 'rocket',
					},
					{
						name: `Browse ${languages[lang]} library`,
						to: '/learn/$lang/library',
						params: { lang },
						icon: 'book-copy',
					},
					{
						name: 'Add a phrase',
						to: '/learn/$lang/add-phrase',
						params: { lang },
						icon: 'notebook-pen',
					},
					{
						name: 'Deck settings',
						to: '/learn/$lang/deck-settings',
						params: { lang },
						icon: 'settings',
					},
					{
						name: 'Friends and contacts',
						to: '/friends',
						icon: 'contact',
					},
				],
			} as NavbarData,
		}
	},
})

function LanguageLayout() {
	return (
		<main className="mx-auto pb-6">
			<Outlet />
		</main>
	)
}
