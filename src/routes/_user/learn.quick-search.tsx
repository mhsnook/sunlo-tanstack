import { createFileRoute } from '@tanstack/react-router'
import { NavbarData } from '@/types/main'

// @@BLANKROUTE maybe remove this route??
export const Route = createFileRoute('/_user/learn/quick-search')({
	loader: () => ({
		navbar: {
			title: `Quick Search for a Phrase`,
		} as NavbarData,
	}),
	component: () => <div>Hello /_app/learn/quick-search!</div>,
})
