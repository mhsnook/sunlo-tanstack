import { cn } from '@/lib/utils'
import type { HTMLAttributes, PropsWithChildren } from 'react'

type CalloutProps = PropsWithChildren & {
	variant?: 'default' | 'problem' | 'ghost'
	className?: string
	alert?: boolean
}

const variants = {
	default: 'bg-primary/20 border-primary/50',
	problem: 'bg-destructive/20 border-destructive/50',
	ghost: 'bg-primary/20 border text-muted-foreground bg-muted',
}

export default function Callout({
	variant = 'default',
	alert = false,
	className,
	children,
}: CalloutProps) {
	let props: HTMLAttributes<HTMLDivElement> = {}
	if (alert) props.role = 'alert'
	return (
		<div
			{...props}
			className={cn(
				'flex flex-row items-center gap-4 rounded border px-[4%] py-[3%]',
				variants[variant],
				className
			)}
		>
			{children}
		</div>
	)
}
