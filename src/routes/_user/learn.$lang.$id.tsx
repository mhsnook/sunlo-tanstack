import { AddTranslationsDialog } from '@/components/add-translations-dialog'
import { CardStatusDropdown } from '@/components/card-status-dropdown'
import PermalinkButton from '@/components/permalink-button'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Callout from '@/components/ui/callout'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import languages from '@/lib/languages'
import { deckQueryOptions } from '@/lib/use-deck'
import { languageQueryOptions } from '@/lib/use-language'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Calendar, Copy, OctagonMinus, Plus, Share2 } from 'lucide-react'
import toast from 'react-hot-toast'

export const Route = createFileRoute('/_user/learn/$lang/$id')({
	component: RouteComponent,
})

function PhraseNotFound() {
	return (
		<Callout variant="problem">
			<Badge variant="destructive" className="p-2">
				<OctagonMinus />
			</Badge>
			<p>We couldn't find that phrase. Please check your link and try again.</p>
		</Callout>
	)
}

function RouteComponent() {
	const { lang, id } = Route.useParams()
	const {
		auth: { userId },
	} = Route.useRouteContext()
	const { data: language } = useQuery(languageQueryOptions(lang))
	const { data: deck } = useQuery(deckQueryOptions(lang, userId))
	const phrase = language.phrasesMap[id] ?? null

	if (phrase === null) return <PhraseNotFound />

	const card = deck.cardsMap[id] ?? null

	const sharePhrase = () => {
		if (navigator.share) {
			navigator
				.share({
					title: `Sunlo: ${phrase.text}`,
					text: `Check out this phrase in ${languages[phrase.lang]}: ${phrase.text}`,
					url: window.location.href,
				})
				.catch(() => {
					toast.error('Failed to share')
				})
		} else {
			copyLink()
		}
	}

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<CardTitle className="text-2xl">{phrase.text}</CardTitle>
						<Badge variant="outline" className="ml-2">
							{languages[phrase.lang]}
						</Badge>
					</div>
					<CardStatusDropdown
						deckId={deck.meta.id}
						card={card}
						pid={phrase.id}
						lang={lang}
					/>
				</div>
				<CardDescription className="mt-2 flex items-center gap-2">
					{!card ?
						<p>This card is not in your deck</p>
					:	<>
							<span>Difficulty score {card?.difficultyScore ?? '7'}/10</span>
							<span className="mx-2">•</span>
							<Calendar className="h-4 w-4" />
							<span>
								Next review scheduled for {card?.nextReview?.day ?? 'Tuesday'}{' '}
								(in {card?.nextReview?.daysFromNow ?? '4'} days)
							</span>
						</>
					}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-6">
					<div>
						<h3 className="mb-3 text-lg font-medium">Translations</h3>
						<div className="space-y-3">
							{phrase.translations.map((translation) => (
								<div key={translation.id} className="bg-muted rounded-lg p-3">
									<div className="flex items-center justify-between">
										<p className="text-md">{translation.text}</p>
										<Badge variant="outline">
											{languages[translation.lang]}
										</Badge>
									</div>
								</div>
							))}
							<AddTranslationsDialog
								phrase={phrase}
								variant="outline"
								className="mt-2 w-full"
							/>
						</div>
					</div>

					<Separator />

					<div className="flex flex-wrap gap-2">
						<PermalinkButton />
						<Button
							onClick={sharePhrase}
							variant="outline"
							className="flex items-center gap-2"
						>
							<Share2 className="h-4 w-4" />
							Share phrase
						</Button>
						<div className="flex-grow"></div>
						<Link to={`/learn/${lang}/library`}>
							<Button variant="ghost">Back to library</Button>
						</Link>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
