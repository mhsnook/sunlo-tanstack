import * as React from 'react'

import { cn } from '@/lib/utils'

const Input = ({
	className,
	type,
	...props
}: React.ComponentProps<'input'>) => {
	return (
		<input
			type={type}
			className={cn(
				'flex h-10 w-full rounded-md border border-primary bg-card px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
				className
			)}
			data-slot="input"
			{...props}
		/>
	)
}
Input.displayName = 'Input'

export { Input }
