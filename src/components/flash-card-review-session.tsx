import { useState } from 'react'
import toast from 'react-hot-toast'
import { Play, ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import SuccessCheckmark from '@/components/SuccessCheckmark'
import { CardFull } from '@/types/main'
import { useLanguagePhrasesMap } from '@/lib/use-language'

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
	const handleDifficultySelect = (difficulty: string) => {
		console.log(
			`Selected difficulty for card ${currentCardIndex + 1}: ${difficulty}`
		)
		navigateCards('forward')
	}

	const isComplete = currentCardIndex === cards.length
	const currentCard = cards[currentCardIndex] ?? null

	const currentPhrase = phrasesMap[currentCard?.phrase_id] ?? null

	return (
		<Card className="w-full mx-auto h-[80vh] flex flex-col">
			{isComplete ?
				<WhenComplete back={() => navigateCards('back')} />
			:	<>
					<CardHeader>
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
					<CardContent className="flex flex-grow flex-col pt-0 px-[10%]  items-center justify-center">
						<div className="flex items-center justify-center mb-4">
							<div className="text-2xl font-bold mr-2">
								{currentPhrase.text}
							</div>
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
					<CardFooter className="flex flex-col">
						{!showTranslation ?
							<Button
								className="w-full mb-4"
								onClick={() => setShowTranslation(true)}
							>
								Show Translation
							</Button>
						:	<div className="w-full grid grid-cols-4 gap-2">
								<Button
									variant="destructive"
									onClick={() => handleDifficultySelect('again')}
								>
									Again
								</Button>
								<Button
									variant="secondary"
									onClick={() => handleDifficultySelect('hard')}
								>
									Hard
								</Button>
								<Button
									variant="default"
									className="bg-green-500 hover:bg-green-600"
									onClick={() => handleDifficultySelect('good')}
								>
									Good
								</Button>
								<Button
									variant="default"
									className="bg-blue-500 hover:bg-blue-600"
									onClick={() => handleDifficultySelect('easy')}
								>
									Easy
								</Button>
							</div>
						}
					</CardFooter>
				</>
			}
		</Card>
	)
}

function WhenComplete({ back }: { back: () => void }) {
	return (
		<>
			<CardHeader>
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
			<CardContent className="flex flex-grow flex-col items-center justify-center gap-4 pb-16 pt-0">
				<h2 className="text-2xl font-bold">Good work!</h2>
				<p className="text-lg">You've completed your review for today.</p>
				<SuccessCheckmark />
			</CardContent>
		</>
	)
}
