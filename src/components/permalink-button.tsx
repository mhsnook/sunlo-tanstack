import { Copy } from 'lucide-react'
import { Button } from './ui/button'
import toast from 'react-hot-toast'
import { ButtonProps } from './ui/button-variants'
import { cn } from '@/lib/utils'

export default function PermalinkButton({
	url = '',
	text = 'Copy link',
	variant = 'outline',
	className = '',
	...props
}: {
	url?: string
	text?: string
} & ButtonProps) {
	const copyLink = () => {
		url = url || window.location.href
		navigator.clipboard
			.writeText(url)
			.then(() => {
				toast.success('Link copied to clipboard')
			})
			.catch(() => {
				toast.error('Failed to copy link')
			})
	}
	return (
		<Button
			onClick={copyLink}
			variant={variant}
			{...props}
			className={cn('flex items-center gap-2', className)}
		>
			<Copy className="h-4 w-4" />
			{text}
		</Button>
	)
}
