import { createFileRoute } from '@tanstack/react-router'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import languages from '@/lib/languages'
import { LangOnlyComponentProps } from '@/types/main'
import { useDeck } from '@/lib/use-deck'
import { useLanguage } from '@/lib/use-language'
import { LanguagePhrasesAccordionComponent } from '@/components/language-phrases-accordion'
import Callout from '@/components/ui/callout'

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
	const deck = useDeck(lang)
	const language = useLanguage(lang)
	return (
		<Card>
			<CardHeader>
				<CardTitle>{languages[lang]} Library</CardTitle>
				<CardDescription>
					(an excrutiating level of detail actually)
				</CardDescription>
			</CardHeader>
			<CardContent>
				{language.data.pids.length > 0 ?
					<div className="flex-basis-[20rem] flex flex-shrink flex-row flex-wrap gap-4">
						<LanguagePhrasesAccordionComponent
							languagePids={language.data.pids}
							phrasesMap={language.data.phrasesMap}
							cardsMap={deck.data.cardsMap}
							deckId={deck.data.meta.id}
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
