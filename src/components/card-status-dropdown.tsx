import supabase from '@/lib/supabase-client'
import { CardInsert, CardRow, uuid } from '@/types/main'
import { PostgrestError } from '@supabase/supabase-js'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { CheckCircle, CircleMinus, Plus, Sparkles, Zap } from 'lucide-react'
import { Badge } from './ui/badge'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from './ui/dropdown-menu'

interface CardStatusDropdownProps {
	deckId: uuid
	pid: uuid
	card: CardRow | null
	className?: string
}

// TODO check if we can get this from the supabase types?
type LearningStatus = 'active' | 'skipped' | 'learned'
type ShowableActions = LearningStatus | 'nodeck' | 'nocard'

const statusStrings = {
	active: {
		short: 'active',
		action: 'Activate card',
		actionSecond: 'Add it to your active learning deck',
		done: 'Card activated',
		icon: () => <Zap className="size-4 text-yellow-500" aria-label="Active" />,
	},
	learned: {
		short: 'learned',
		action: 'Set "learned"',
		actionSecond: 'This will remove the card from your daily rotation',
		done: 'Marked "&ldquo;"learned"',
		icon: () => (
			<Sparkles className="size-4 text-green-500" aria-label="Learned" />
		),
	},
	skipped: {
		short: 'skipped',
		action: 'Ignore card',
		actionSecond: 'This will remove the card from your daily rotation',
		done: 'Ignoring card',
		icon: () => (
			<CircleMinus className="size-4 text-gray-500" aria-label="Skipped" />
		),
	},
	nocard: {
		short: 'add',
		action: 'Add to deck',
		actionSecond: 'This will add the card to your deck with status "active"',
		done: 'Card removed',
		icon: () => <Plus className="size-4 text-gray-500" aria-label="Add card" />,
	},
	nodeck: {
		short: '...',
		action: 'Add deck',
		actionSecond: 'Create a new deck to learn this phrase and more',
		done: 'Deck archived',
		icon: () => (
			<Plus className="size-4 text-gray-500" aria-label="Start learning" />
		),
	},
}

function StatusSpan({ choice }: { choice: ShowableActions }) {
	return (
		<div className="flex flex-row gap-2 items-center pe-2 py-1">
			{statusStrings[choice].icon()}
			<div>
				<p className="font-bold">{statusStrings[choice].action}</p>
				<p className="text-muted-foreground text-sm">
					{statusStrings[choice].actionSecond}
				</p>
			</div>
		</div>
	)
}

export function CardStatusDropdown({
	deckId,
	pid,
	card,
	className,
}: CardStatusDropdownProps) {
	const addToDeck = useMutation<CardInsert, PostgrestError, CardRow>({
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

	const cardPresent = addToDeck.data ?? card
	const choice =
		!deckId ? 'nodeck'
		: !cardPresent ? 'nocard'
		: cardPresent?.status

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className={className}>
				<Badge variant="outline" className="gap-1">
					{addToDeck.isSuccess ?
						<CheckCircle className="size-4 text-green-500" />
					:	statusStrings[choice].icon()}{' '}
					{statusStrings[choice].short}
				</Badge>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="">
				{!deckId ?
					<DropdownMenuItem>
						<StatusSpan choice="nodeck" />
					</DropdownMenuItem>
				: !cardPresent ?
					<DropdownMenuItem>
						<StatusSpan choice="nocard" />
					</DropdownMenuItem>
				:	<>
						<DropdownMenuItem>
							<StatusSpan choice="active" />
						</DropdownMenuItem>
						<DropdownMenuItem>
							<StatusSpan choice="learned" />
						</DropdownMenuItem>
						<DropdownMenuItem>
							<StatusSpan choice="skipped" />
						</DropdownMenuItem>
					</>
				}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
