import {
	CardFull,
	CardsMap,
	PhraseFull,
	PhrasesMap,
	pids,
	uuid,
} from '@/types/main'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { CardStatusDropdown } from './card-status-dropdown'
import { AddTranslationsDialog } from './add-translations-dialog'

interface PhrasesWithOptionalOrder {
	pids?: pids
	phrasesMap: PhrasesMap
	languagePids: pids
	cardsMap: CardsMap
	deckId: uuid
}

export function LanguagePhrasesAccordionComponent({
	pids = null,
	phrasesMap,
	languagePids = null,
	cardsMap,
	deckId,
}: PhrasesWithOptionalOrder) {
	const pidsToUse = pids ?? languagePids ?? Object.keys(phrasesMap)
	return (
		<Accordion type="single" collapsible className="w-full">
			{pidsToUse.map((pid) => (
				<PhraseAccordionItem
					key={pid}
					phrase={phrasesMap[pid]}
					card={cardsMap[pid] ?? null}
					deckId={deckId}
				/>
			))}
		</Accordion>
	)
}

function PhraseAccordionItem({
	phrase,
	card,
	deckId,
}: {
	phrase: PhraseFull
	card: CardFull | null
	deckId: uuid
}) {
	return (
		<AccordionItem value={phrase.id} className="border rounded mb-2 px-2">
			<div className="flex flex-row gap-2 items-center">
				<CardStatusDropdown deckId={deckId} pid={phrase.id} card={card} />
				<AccordionTrigger>{phrase.text}</AccordionTrigger>
			</div>
			<AccordionContent>
				<div className="pl-6 pt-2 space-y-1">
					<p className="text-sm text-gray-500">Translations</p>
					<ul className="space-y-1">
						{phrase.translations.map((translation, index) => (
							<li key={index} className="flex items-center">
								<span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-xs mr-2">
									{translation.lang}
								</span>
								<span className="text-sm">{translation.text}</span>
							</li>
						))}
					</ul>
					<AddTranslationsDialog
						phrase={phrase}
						size="badge"
						variant="link"
						className="text-xs"
					/>
				</div>
			</AccordionContent>
		</AccordionItem>
	)
}
