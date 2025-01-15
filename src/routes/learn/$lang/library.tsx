import { useMemo, useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import languages from '@/lib/languages'
import type { LangOnlyComponentProps, PhraseFull } from '@/types/main'
import { useDeck } from '@/lib/use-deck'
import { useLanguage } from '@/lib/use-language'
import { LanguagePhrasesAccordionComponent } from '@/components/language-phrases-accordion'
import Callout from '@/components/ui/callout'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { inLastWeek } from '@/lib/dayjs'
import { PhraseCard } from '@/components/phrase-card'
import { Skeleton } from '@/components/ui/skeleton'
import { Brain, Carrot, LucideIcon, Plus, TrendingUp } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'

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

type PhraseSectionProps = {
	description: string
	phrases: PhraseFull[] | undefined
	isLoading: boolean
	Icon: LucideIcon
}

const PhraseSection = ({
	description,
	phrases,
	isLoading,
	Icon,
}: PhraseSectionProps) => (
	<div>
		<p className="text-sm my-1">
			<Icon className="w-4 h-4 inline" /> {description}
		</p>
		{isLoading ?
			<div className="flex flex-row gap-2 overflow-x-auto">
				{[...Array(2 + Math.round(Math.random() * 3))].map((_, i) => (
					<Skeleton
						key={i}
						style={{ width: 100 + Math.round(Math.random() * 80) }}
						className={`h-[60px] flex-shrink-0`}
					/>
				))}
			</div>
		: phrases && phrases.length > 0 ?
			<div className="flex flex-row gap-2 overflow-x-auto">
				{phrases.map((phrase) => (
					<PhraseCard key={phrase.id} phrase={phrase} />
				))}
			</div>
		:	<p className="text-center text-muted-foreground">No phrases available</p>}
	</div>
)

type Phrase = {
	id: string
	text: string
	literal: string
}

const samplePhrases: Record<string, Phrase[]> = {
	trending: [
		{ id: '1', text: 'vanakkam', literal: 'Hello' },
		{ id: '2', text: 'நன்றி', literal: 'Thank you' },
		{ id: '3', text: 'en peyar?', literal: 'What is your name?' },
	],
	challenging: [
		{
			id: '4',
			text: 'Tamil teriyum',
			literal: 'I am learning Tamil',
		},
		{ id: '5', text: 'Unga peyar enna?', literal: 'What is your name?' },
	],
	easy: [
		{ id: '6', text: 'Sari', literal: 'Yes' },
		{ id: '7', text: 'Illai', literal: 'No' },
		{ id: '8', text: 'Sari', literal: 'Okay' },
	],
}

function PopularPhrases({ lang }: LangOnlyComponentProps) {
	console.log(`Pretend I'm fetching recommendations for ${lang}`)
	return (
		<Card>
			<CardHeader>
				<CardTitle>Recommended Phrases For You</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<PhraseSection
					description="Popular phrases among all Tamil learners"
					phrases={samplePhrases.trending}
					isLoading={false}
					Icon={TrendingUp}
				/>
				<PhraseSection
					description="More advanced, but in reach"
					phrases={samplePhrases.challenging}
					isLoading={false}
					Icon={Brain}
				/>
				<PhraseSection
					description="Broaden your vocabulary"
					phrases={samplePhrases.easy}
					isLoading={false}
					Icon={Carrot}
				/>
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
				<CardTitle>
					<div className="flex flex-row gap-2 justify-between">
						<span>Explore the {languages[lang]} Library</span>
						<Link
							to="/learn/$lang/add-phrase"
							params={{ lang }}
							className={buttonVariants({
								size: 'badge',
								variant: 'outline',
							})}
						>
							<Plus className="h-3 w-3" />
							<span className="me-1">new phrase</span>
						</Link>
					</div>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex flex-row flex-wrap gap-2 text-muted-foreground mb-4">
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
							lang={lang}
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
