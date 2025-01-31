import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { NavbarData } from '@/types/main'
import { FlashCardReviewSession } from '@/components/flash-card-review-session'
import languages from '@/lib/languages'
import { deckQueryOptions } from '@/lib/use-deck'
import { reviewablesQueryOptions } from '@/lib/use-reviewables'
import { BookHeart, Search, Settings, SquarePlus } from 'lucide-react'

export const Route = createFileRoute('/_user/learn/$lang/review')({
	component: ReviewPage,
	loader: async ({
		params: { lang },
		context: {
			queryClient,
			auth: { userId },
		},
	}) => {
		const promise1 = queryClient.fetchQuery(deckQueryOptions(lang, userId))
		const promise2 = queryClient.fetchQuery(
			reviewablesQueryOptions(lang, userId)
		)
		const data = {
			deck: await promise1,
			reviewables: await promise2,
		}
		console.log(`preparing today's review`, data)
		return {
			reviewableCards: data.reviewables.map(
				(r) => data.deck.cardsMap[r.phrase_id]
			),
			navbar: {
				title: `Review ${languages[lang]} cards`,
				Icon: BookHeart,
				contextMenu: [
					{
						name: `Search ${languages[lang]}`,
						link: {
							to: '/learn/$lang/search',
							params: { lang },
						},
						Icon: Search,
					},
					{
						name: 'Add a phrase',
						link: {
							to: '/learn/$lang/add-phrase',
							params: { lang },
						},
						Icon: SquarePlus,
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

function ReviewPage() {
	const { lang } = Route.useParams()
	const { reviewableCards } = Route.useLoaderData()
	return reviewableCards.length === 0 ?
			<Empty lang={lang} />
		:	<FlashCardReviewSession cards={reviewableCards} lang={lang} />
}

const Empty = ({ lang }: { lang: string }) => (
	<Card className="py-6 px-[5%]">
		<CardHeader className="my-6 opacity-70">
			<CardTitle>No cards to review</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4 mb-6">
			<p>
				This is empty because there are no active cards in your{' '}
				{languages[lang]} deck.
			</p>
			<p>
				You can go to the{' '}
				<Link
					className="s-link"
					to="/learn/$lang/search"
					params={{ lang }}
					from={Route.fullPath}
				>
					search page
				</Link>{' '}
				to find new phrases to learn, or{' '}
				<Link
					className="s-link"
					to="/learn/$lang/add-phrase"
					params={{ lang }}
					from={Route.fullPath}
				>
					add your own
				</Link>
				!
			</p>
		</CardContent>
	</Card>
)
