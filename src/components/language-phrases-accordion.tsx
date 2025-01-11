import { useMutation, UseMutationResult } from '@tanstack/react-query'
import {
	Zap,
	SkipForward,
	CheckCircle,
	PlusCircle,
	Loader2,
} from 'lucide-react'

import {
	CardFull,
	CardRow,
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
import { Button } from '@/components/ui/button'
import supabase from '@/lib/supabase-client'
import toast from 'react-hot-toast'
import { PostgrestError } from '@supabase/supabase-js'
import { Badge } from './ui/badge'

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
		<Accordion type="single" collapsible className="w-full p-2">
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
	const addToDeck = useMutation<CardRow, PostgrestError>({
		mutationKey: ['add-card-to-deck', phrase?.id],
		mutationFn: async () => {
			if (!deckId || !phrase?.id)
				throw new Error('No deck ID or phrase ID provided')
			const { data } = await supabase
				.from('user_card')
				.insert({
					user_deck_id: deckId,
					phrase_id: phrase.id,
				})
				.select()
				.throwOnError()
			return data[0]
		},
		onSuccess: () => {
			toast.success('Added this phrase to your deck')
		},
	})

	return (
		<AccordionItem value={phrase.id}>
			<div className="flex flex-row gap-2 items-center">
				{!deckId ?
					null
				: card === null ?
					<AddToDeckIcon addToDeck={addToDeck} />
				:	<StatusBadge status={card?.status} />}

				<AccordionTrigger className="flex flex-row justify-between gap-2">
					<span>{phrase.text}</span>
				</AccordionTrigger>
			</div>
			<AccordionContent>
				<div className="pl-6 pt-2">
					<p className="text-sm text-gray-500 mb-1">Translations</p>
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
				</div>
			</AccordionContent>
		</AccordionItem>
	)
}

function AddToDeckIcon({
	addToDeck,
}: {
	addToDeck: UseMutationResult<CardRow>
}) {
	return addToDeck.data ?
			<StatusBadge status={addToDeck.data.status} justAdded />
		:	<Button
				variant="ghost"
				size="icon-sm"
				onClick={addToDeck.mutate}
				className="p-0"
				aria-label="Add to deck"
				disabled={addToDeck.isPending}
			>
				{addToDeck.isPending ?
					<Loader2 />
				: addToDeck.isSuccess ?
					<CheckCircle />
				:	<PlusCircle className="text-gray-500" />}
			</Button>
}

// TODO check if we can get this from the supabase types?
type LearningStatus = 'active' | 'skipped' | 'learned'

function StatusIcon({ status }: { status: LearningStatus }) {
	return (
		status === 'active' ?
			<Zap className="h-4 w-4 me-1 text-yellow-500" aria-label="Active" />
		: status === 'skipped' ?
			<SkipForward className="h-4 w-4 text-gray-500" aria-label="Skipped" />
		: status === 'learned' ?
			<CheckCircle className="h-4 w-4 text-green-500" aria-label="Learned" />
		:	null
	)
}

function StatusBadge({
	status,
	justAdded = false,
}: {
	status: LearningStatus
	justAdded?: boolean
}) {
	return (
		<Badge variant="outline">
			{justAdded ?
				<CheckCircle className="h-4 w-4 text-green-500" aria-label="Learned" />
			:	<StatusIcon status={status} />}
			<span>{status}</span>
		</Badge>
	)
}
