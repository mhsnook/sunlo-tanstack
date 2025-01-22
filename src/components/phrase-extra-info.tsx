import { CardFull, uuid } from '@/types/main'
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from './ui/alert-dialog'
import { ago } from '@/lib/dayjs'
import { useLanguagePhrase } from '@/lib/use-language'
import { Button } from './ui/button'
import { Ellipsis } from 'lucide-react'
import { useDeckCard } from '@/lib/use-deck'
import dayjs from 'dayjs'

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
		<AlertDialog>
			<AlertDialogTrigger className={className} asChild>
				<Button variant="ghost" size="icon-sm">
					<Ellipsis className="h-4 w-4" />
					<span className="sr-only">Show more</span>
				</Button>
			</AlertDialogTrigger>
			{phrase.isPending ? null : (
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>User card details</AlertDialogTitle>
						<AlertDialogDescription>
							&ldquo;{phrase.data.text}&rdquo;
						</AlertDialogDescription>
					</AlertDialogHeader>
					<div className="block space-y-4">
						<div className="flex flex-col">
							<span className="font-semibold">Phrase created at</span>
							<span>{ago(phrase.data.created_at)}</span>
						</div>
					</div>
					{!card.data ? null : <CardSection card={card.data} />}
				</AlertDialogContent>
			)}
		</AlertDialog>
	)
}

function round(num: number, pow: number = 2) {
	return num === undefined || num === null ?
			'null'
		:	Math.pow(10, -pow) * Math.round(Math.pow(10, pow) * num)
}
function dateDiff(prev_at: string, later_at: string = '') {
	const later = later_at ? dayjs(later_at) : dayjs()
	const prev = dayjs(prev_at)
	return later.diff(prev, 'day', true)
}
function retrievability(
	prev_at: string,
	stability: number,
	later_at: string = ''
) {
	const F = 19 / 81,
		C = -0.5
	const diff = dateDiff(prev_at, later_at)
	return Math.pow(1.0 + F * (diff / stability), C)
}

function intervals() {
	return [1, 2, 3, 4]
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
