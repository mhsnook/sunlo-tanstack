import supabase from '@/lib/supabase-client'
import { CardRow, uuid } from '@/types/main'
import { PostgrestError } from '@supabase/supabase-js'
import { useMutation, UseMutationResult } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { Button } from './ui/button'
import {
	CheckCircle,
	Loader2,
	PlusCircle,
	SkipForward,
	Zap,
} from 'lucide-react'
import { Badge } from './ui/badge'

interface CardStatusDropdownProps {
	deckId: uuid
	pid: uuid
	card: CardRow | null
}

export function CardStatusDropdown({
	deckId,
	pid,
	card,
}: CardStatusDropdownProps) {
	const addToDeck = useMutation<CardRow, PostgrestError>({
		mutationKey: ['add-card-to-deck', pid],
		mutationFn: async () => {
			if (!deckId || !pid) throw new Error('No deck ID or phrase ID provided')
			const { data } = await supabase
				.from('user_card')
				.insert({
					user_deck_id: deckId,
					phrase_id: pid,
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
		<>
			{!deckId ?
				null
			: card === null ?
				<AddToDeckIcon addToDeck={addToDeck} />
			:	<StatusBadge status={card?.status} />}
		</>
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
