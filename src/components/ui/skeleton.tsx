import { cn } from '@/lib/utils'
import * as react from 'react'

function Skeleton({
	className,
	...props
}: react.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn('animate-pulse rounded-md bg-muted', className)}
			{...props}
		/>
	)
}

export { Skeleton }
