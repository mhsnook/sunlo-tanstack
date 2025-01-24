import { cn } from '@/lib/utils'
import { uuid } from '@/types/main'
import { buttonVariants } from '@/components/ui/button-variants'

type PhraseCardProps = {
	phrase: {
		id: uuid
		text: string
		literal: string
	}
}

export const PhraseCard = ({ phrase }: PhraseCardProps) => (
	<a
		className={cn(
			buttonVariants({ variant: 'link' }),
			`s-link border rounded p-3`
		)}
		href="google.com?search=id"
	>
		<span className="font-semibold">{phrase.text}</span>{' '}
		<span className="text-sm text-muted-foreground">{phrase.literal}</span>
	</a>
)
