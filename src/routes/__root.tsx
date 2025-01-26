import {
	createRootRouteWithContext,
	Link,
	Outlet,
} from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { AuthState } from '@/components/auth-context'

interface MyRouterContext {
	auth: AuthState
	queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	component: RootComponent,
	notFoundComponent: () => {
		return (
			<div>
				<p>This is the notFoundComponent configured on root route</p>
				<Link to="/">Start Over</Link>
			</div>
		)
	},
})

function RootComponent() {
	return (
		<>
			<div className="mx-auto w-full max-w-[960px] @container">
				<Outlet />
			</div>
			<Toaster position="bottom-center" />
		</>
	)
}
