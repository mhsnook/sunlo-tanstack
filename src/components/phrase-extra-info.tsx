import { CardFull, uuid } from '@/types/main'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog'
import { ago } from '@/lib/dayjs'
import { useLanguagePhrase } from '@/lib/use-language'
import { Button } from './ui/button'
import { Ellipsis } from 'lucide-react'
import { useDeckCard } from '@/lib/use-deck'
import { dateDiff, intervals, retrievability, round } from '@/lib/utils'

export default function PhraseExtraInfo({
	pid,
	lang,
	className,
}: {
	pid: uuid
	lang: string
	className?: string
}) {
	const phrase = useLanguagePhrase(pid, lang)
	const card = useDeckCard(pid, lang)

	return (
		<Dialog>
			<DialogTrigger className={className} asChild>
				<Button variant="ghost" size="icon-sm">
					<Ellipsis className="size-4" />
					<span className="sr-only">Show more</span>
				</Button>
			</DialogTrigger>
			{phrase.isPending ? null : (
				<DialogContent className="max-h-[90vh] max-w-[90vw] overflow-y-auto">
					<DialogHeader>
						<DialogTitle>User card details</DialogTitle>
						<DialogDescription>
							&ldquo;{phrase.data.text}&rdquo;
						</DialogDescription>
					</DialogHeader>

					<div className="block space-y-4">
						<div className="flex flex-col">
							<span className="font-semibold">Phrase ID</span>
							<span>{phrase.data.id}</span>
						</div>
						<div className="flex flex-col">
							<span className="font-semibold">Phrase created at</span>
							<span>{ago(phrase.data.created_at)}</span>
						</div>
					</div>
					{!card.data ?
						<p>Phrase has no card in your deck</p>
					:	<CardSection card={card.data} />}
				</DialogContent>
			)}
		</Dialog>
	)
}

function CardSection({ card }: { card: CardFull }) {
	const reviews = card?.reviews.sort((a, b) =>
		a.created_at > b.created_at ? -1
		: a.created_at < b.created_at ? 1
		: 0
	)
	const rev = reviews?.[0] || null
	const retr = !rev ? null : retrievability(rev.created_at, rev.new_stability)
	return (
		<div className="block space-y-4">
			<div className="flex flex-col">
				<span className="font-semibold">Card ID</span>
				<span>{card.id}</span>
			</div>
			<div className="flex flex-col">
				<span className="font-semibold">Card created at</span>
				<span>{ago(card.created_at)}</span>
			</div>
			{!rev ?
				<p>Never reviewed</p>
			:	<>
					<div className="flex flex-col">
						<span className="font-semibold">
							Recentest of {reviews.length} reviews
						</span>
						<span>{ago(reviews[0].created_at)}</span>
					</div>
					<div className="flex flex-col">
						<span className="font-semibold">Card current variables:</span>
						<span>
							Difficulty {round(rev.new_difficulty)}, Stability{' '}
							{round(rev.new_stability)}, {round(dateDiff(rev.created_at), 3)}{' '}
							days since last review.
						</span>
						<span>Expected retrievability if reviewed this minute: {retr}</span>
						<span>
							Interval spread for a review this minute:{' '}
							{intervals()
								.map((i) => round(i))
								.join(', ')}
						</span>
					</div>
				</>
			}

			<div className="flex flex-col">
				<ul className="space-y-2">
					{reviews.map((r) => (
						<li key={r.id} className="hover:bg-background/20 p-2 border ">
							<p>
								score: {r.score}, {ago(r.created_at)}, next due{' '}
								{ago(r.scheduled_for)}
							</p>
							<p>{r.created_at}</p>
							<p>Expected R: {round(r.review_time_retrievability)}</p>
							<p>
								Difficulty: {round(r.new_difficulty)} from{' '}
								{round(r.review_time_difficulty)}
							</p>
							<p>
								Stability: {round(r.new_stability)} from{' '}
								{round(r.review_time_stability)}
							</p>
							<p>New Interval: {round(r.new_interval_r90)} days</p>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
