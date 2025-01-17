import { useState } from 'react'
import toast from 'react-hot-toast'
import { Play, ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import SuccessCheckmark from '@/components/SuccessCheckmark'
import { CardFull, ReviewInsert, ReviewRow, uuid } from '@/types/main'
import { useLanguagePhrasesMap } from '@/lib/use-language'
import { useMutation } from '@tanstack/react-query'
import supabase from '@/lib/supabase-client'
import { cn } from '@/lib/utils'

interface ComponentProps {
	cards: Array<CardFull>
	lang: string
}

const playAudio = (text: string) => {
	toast(`Playing audio for: ${text}`)
	// In a real application, you would trigger audio playback here
}

export function FlashCardReviewSession({ lang, cards }: ComponentProps) {
	const [currentCardIndex, setCurrentCardIndex] = useState(0)
	const [showTranslation, setShowTranslation] = useState(false)
	const { data: phrasesMap } = useLanguagePhrasesMap(lang)

	const navigateCards = (direction: 'forward' | 'back') => {
		if (direction === 'forward') setCurrentCardIndex(currentCardIndex + 1)
		if (direction === 'back') setCurrentCardIndex(currentCardIndex - 1)
		setShowTranslation(false)
	}

	const isComplete = currentCardIndex === cards.length
	const currentCard = cards[currentCardIndex] ?? null

	const currentPhrase = phrasesMap[currentCard?.phrase_id] ?? null

	return (
		<Card className="w-full mx-auto h-[80vh] flex flex-col">
			<WhenComplete
				shouldShow={isComplete}
				back={() => navigateCards('back')}
			/>

			<CardHeader className={isComplete ? 'hidden' : ''}>
				<div className="flex justify-center items-center mb-2 gap-1 mt-2">
					<Button
						size="icon-sm"
						variant="ghost"
						onClick={() => navigateCards('back')}
						disabled={currentCardIndex === 0}
						aria-label="Previous card"
					>
						<ChevronLeft className="h-4 w-4" />
					</Button>
					<div className="text-sm text-center">
						Card {currentCardIndex + 1} of {cards.length}
					</div>
					<Button
						size="icon-sm"
						variant="ghost"
						onClick={() => navigateCards('forward')}
						disabled={currentCardIndex === cards.length}
						aria-label="Next card"
					>
						<ChevronRight className="h-4 w-4" />
					</Button>
				</div>
			</CardHeader>
			{isComplete ?
				<></>
			:	<CardContent className="flex flex-grow flex-col pt-0 px-[10%] items-center justify-center">
					<div className="flex items-center justify-center mb-4">
						<div className="text-2xl font-bold mr-2">{currentPhrase.text}</div>
						<Button
							size="icon"
							variant="secondary"
							onClick={() => playAudio(currentPhrase.text)}
							aria-label="Play original phrase"
						>
							<Play className="h-4 w-4" />
						</Button>
					</div>
					<div>
						{!showTranslation ? null : (
							currentPhrase.translations.map((trans) => (
								<div key={trans.id} className="flex items-center mt-4">
									<span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-xs mr-2">
										{trans.lang}
									</span>
									<div className="text-xl me-2">{trans.text}</div>
									<Button
										size="icon-sm"
										variant="secondary"
										onClick={() => playAudio(trans.text)}
										aria-label="Play translation"
									>
										<Play className="h-4 w-4" />
									</Button>
								</div>
							))
						)}
					</div>
				</CardContent>
			}
			{cards.map((card) => (
				<UserCardReviewScoreButtonsRow
					key={card.phrase_id}
					phrase_id={card.phrase_id}
					isButtonsShown={showTranslation}
					showTheButtons={() => setShowTranslation(true)}
					dontShowThisRowRightNow={isComplete || currentCard.id !== card.id}
					proceed={() => {
						setShowTranslation(false)
						navigateCards('forward')
					}}
				/>
			))}
		</Card>
	)
}

const postReview = async ({ phrase_id, score, id: prevId }: ReviewInsert) => {
	if (!phrase_id || !score) throw new Error('Invalid review; cannot log')

	let submitData: ReviewInsert = {
		score,
		phrase_id,
	}
	if (prevId) submitData['id'] = prevId

	// console.log(`About to post the review,`, submitData, prevId)

	const { data } = await supabase
		.from('user_card_review')
		.upsert(submitData)
		.select()
		.throwOnError()

	// console.log(`We posted the review,`, data, error)
	return data[0]
}

interface CardInnerProps {
	phrase_id: uuid
	isButtonsShown: boolean
	showTheButtons: () => void
	dontShowThisRowRightNow: boolean
	proceed: () => void
}

function UserCardReviewScoreButtonsRow({
	phrase_id,
	isButtonsShown,
	dontShowThisRowRightNow,
	showTheButtons,
	proceed,
}: CardInnerProps) {
	const { data, mutate, isPending } = useMutation({
		mutationFn: async ({
			score,
			data,
		}: {
			score: number
			data?: ReviewRow
		}) => {
			if (data?.score === score) return data
			return await postReview({ score, phrase_id, id: data?.id })
		},
		onSuccess: (result: ReviewRow) => {
			console.log(`onSuccess firing with`, result)
			if (result.score === 1)
				toast('okay', { icon: '🤔', position: 'bottom-center' })
			if (result.score === 2)
				toast('okay', { icon: '🤷', position: 'bottom-center' })
			if (result.score === 3)
				toast('got it', { icon: '👍️', position: 'bottom-center' })
			if (result.score === 4)
				toast.success('nice', { position: 'bottom-center' })
			setTimeout(proceed, 1500)
		},
		onError: (error) => {
			toast.error(`There was some kind of error idk: ${error.message}`)
			console.log(`Error posting review:`, error)
		},
	})

	return dontShowThisRowRightNow ? null : (
			<CardFooter className="flex flex-col">
				{!isButtonsShown ?
					<Button className="w-full mb-4" onClick={showTheButtons}>
						Show Translation
					</Button>
				:	<div className="w-full grid grid-cols-4 gap-2">
						<Button
							variant="destructive"
							onClick={() => mutate({ score: 1, data })}
							disabled={isPending}
							className={data?.score === 1 ? 'ring ring-offset-1' : ''}
						>
							Again
						</Button>
						<Button
							variant="secondary"
							onClick={() => mutate({ score: 2, data })}
							disabled={isPending}
							className={data?.score === 2 ? 'ring ring-offset-1' : ''}
						>
							Hard
						</Button>
						<Button
							variant="default"
							onClick={() => mutate({ score: 3, data })}
							disabled={isPending}
							className={cn(
								'bg-green-500 hover:bg-green-600',
								data?.score === 3 ? 'ring ring-offset-1' : ''
							)}
						>
							Good
						</Button>
						<Button
							variant="default"
							className={cn(
								'bg-blue-500 hover:bg-blue-600',
								data?.score === 4 ? 'ring ring-offset-1' : ''
							)}
							onClick={() => mutate({ score: 4, data })}
							disabled={isPending}
						>
							Easy
						</Button>
					</div>
				}
			</CardFooter>
		)
}

function WhenComplete({
	shouldShow,
	back,
}: {
	shouldShow: boolean
	back: () => void
}) {
	return (
		<>
			<CardHeader className={shouldShow ? '' : 'hidden'}>
				<div className="mx-auto pt-[2px]">
					<Button
						size="sm"
						variant="ghost"
						aria-label="back to cards"
						onClick={back}
						className="ps-2 pe-4"
					>
						<ChevronLeft className="h-4 w-4 me-1" /> Back to cards
					</Button>
				</div>
			</CardHeader>
			<CardContent
				className={cn(
					`flex flex-grow flex-col items-center justify-center gap-4 pb-16 pt-0`,
					shouldShow ? '' : 'hidden'
				)}
			>
				<h2 className="text-2xl font-bold">Good work!</h2>
				<p className="text-lg">You've completed your review for today.</p>
				<SuccessCheckmark />
			</CardContent>
		</>
	)
}
