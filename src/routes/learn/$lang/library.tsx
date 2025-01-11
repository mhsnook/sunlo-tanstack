import { useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import languages from '@/lib/languages'
import type { LangOnlyComponentProps } from '@/types/main'
import { useDeck } from '@/lib/use-deck'
import { useLanguage } from '@/lib/use-language'
import { LanguagePhrasesAccordionComponent } from '@/components/language-phrases-accordion'
import Callout from '@/components/ui/callout'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { inLastWeek } from '@/lib/dayjs'

export const Route = createFileRoute('/learn/$lang/library')({
	component: DeckLibraryPage,
})

function DeckLibraryPage() {
	const { lang } = Route.useParams()
	return (
		<div className="space-y-4 px-2">
			<PopularPhrases lang={lang} />
			<DeckContents lang={lang} />
		</div>
	)
}

function PopularPhrases({ lang }: LangOnlyComponentProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Trending / Recommended Phrases</CardTitle>
				<CardDescription>
					Don't you want to add just a few more {languages[lang]} phrases to
					your deck?
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ul className="list-disc ms-4">
					<li>Popular phrases from across the network.</li>
					<li>
						Reaching new heights: phrases similar to ones you know, but higher
						difficulty.
					</li>
					<li>
						Covering bases: phrases that are much less complex than your current
						level, but you don't have them yet, and don't have many related
						phrases (i.e. they're unlikely to feed repetetive).
					</li>
				</ul>
			</CardContent>
		</Card>
	)
}

function DeckContents({ lang }: LangOnlyComponentProps) {
	const { data: deck } = useDeck(lang)
	const { data: language } = useLanguage(lang)

	const [filter, setFilter] = useState<'all' | 'inDeck' | 'recentlyViewed'>(
		'all'
	)

	const pids = useMemo(
		() => ({
			all: language.pids,
			inDeck: deck.pids,
			recentlyViewed: deck.pids.filter(
				(p) =>
					deck.cardsMap[p].phrase.reviews?.[0]?.created_at &&
					inLastWeek(deck.cardsMap[p].phrase.reviews[0].created_at)
			),
		}),
		[language.pids, deck.pids, deck.cardsMap]
	)

	const filteredPids = pids[filter]
	return (
		<Card>
			<CardHeader>
				<CardTitle>{languages[lang]} Library</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex flex-row flex-wrap gap-2 text-muted-foreground">
					<span className="text-sm ">Filters:</span>
					<Badge variant="outline">
						<label className="cursor-pointer flex gap-1">
							<Checkbox
								onClick={() => setFilter('all')}
								checked={filter === 'all'}
							/>{' '}
							all phrases ({pids.all.length})
						</label>
					</Badge>
					<Badge variant="outline">
						<label className="cursor-pointer flex gap-1">
							<Checkbox
								onClick={() => setFilter('inDeck')}
								checked={filter === 'inDeck'}
							/>{' '}
							in your deck ({pids.inDeck.length})
						</label>
					</Badge>
					<Badge variant="outline">
						<label className="cursor-pointer flex gap-1">
							<Checkbox
								onClick={() => setFilter('recentlyViewed')}
								checked={filter === 'recentlyViewed'}
							/>{' '}
							reviewed recently ({pids.recentlyViewed.length})
						</label>
					</Badge>
				</div>
				{language.pids.length > 0 ?
					<div className="flex-basis-[20rem] flex flex-shrink flex-row flex-wrap gap-4">
						<LanguagePhrasesAccordionComponent
							pids={filteredPids}
							languagePids={language.pids}
							phrasesMap={language.phrasesMap}
							cardsMap={deck.cardsMap}
							deckId={deck.meta.id}
						/>
					</div>
				:	<Callout className="mt-4" variant="ghost">
						This language is fully empty! We should have a good pitch here for
						you, user. To say "come check out some starter phrases and
						contribute to the community" or somesuch.
					</Callout>
				}
			</CardContent>
		</Card>
	)
}
