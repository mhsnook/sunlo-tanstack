import type { ButtonProps } from './ui/button-variants'
import type { uuid } from '@/types/main'
import { Share2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { useLanguagePhrase } from '@/lib/use-language'
import languages from '@/lib/languages'

export default function SharePhraseButton({
	lang,
	pid,
	text = 'Share phrase',
	variant = 'outline',
	className = '',
	...props
}: {
	lang: string
	pid: uuid
	text?: string
	variant?: string
	className?: string
} & ButtonProps) {
	const { data: phrase, isPending } = useLanguagePhrase(pid, lang)
	if (isPending || !phrase || !navigator.share) return null

	const shareContent = {
		title: `Sunlo: ${phrase.text}`,
		text: `Check out this phrase in ${languages[lang]}: ${phrase.text}`,
		url: `${window.location.origin}/learn/${lang}/${phrase.id}`,
	}

	const sharePhrase = () => {
		navigator.share(shareContent).catch(() => {
			toast.error('Failed to share')
		})
	}
	return (
		<Button
			onClick={sharePhrase}
			variant={variant}
			className={cn('flex items-center gap-2', className)}
			{...props}
		>
			<Share2 className="h-4 w-4" />
			{text}
		</Button>
	)
}
