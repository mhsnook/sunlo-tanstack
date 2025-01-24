import { cn } from '@/lib/utils'
import { BadgeProps, badgeVariants } from './badge-variants'

function Badge({ className, variant, ...props }: BadgeProps) {
	return (
		<span className={cn(badgeVariants({ variant }), className)} {...props} />
	)
}

export { Badge }
