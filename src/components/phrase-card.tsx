import { cn } from '@/lib/utils'
import { PhraseStub } from '@/types/main'
import { buttonVariants } from '@/components/ui/button-variants'

type PhraseCardProps = {
	phrase: PhraseStub
}

export const PhraseCard = ({ phrase }: PhraseCardProps) => (
	<a
		className={cn(
			buttonVariants({ variant: 'link' }),
			`s-link rounded border p-3`
		)}
		href="google.com?search=id"
	>
		<span className="font-semibold">{phrase.text}</span>{' '}
		<span className="text-muted-foreground text-sm">
			{phrase.translation.text}
		</span>
	</a>
)
