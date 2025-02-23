import { flags } from '@/lib/flags'
import { ReactNode } from '@tanstack/react-router'

export default function Flagged({
	name,
	children,
}: {
	name: keyof typeof flags
	children: ReactNode
}) {
	// the disabled flag is an override; hides the content even in dev mode
	if (flags[name].disabled === true) return null
	// the enabled flag is the primary control
	if (flags[name].enabled === true) return children

	// show content in dev/preview mode, with a little yellow border
	return import.meta.env.PROD ?
			null
		:	<div className="border border-dashed border-yellow-500">{children}</div>
}
