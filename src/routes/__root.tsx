import {
	createRootRouteWithContext,
	Link,
	Outlet,
} from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { AuthState } from '@/components/auth-context'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { Separator } from '@/components/ui/separator'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'

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
		<SidebarProvider>
			<div className="flex h-screen overflow-hidden w-full">
				<AppSidebar />
				<SidebarInset className="flex-1 w-full">
					<header className="flex h-16 shrink-0 items-center gap-2 border-b px-6">
						<SidebarTrigger />
						<Separator orientation="vertical" className="mx-2 h-6" />
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem className="hidden md:inline-flex">
									<BreadcrumbLink href="#">
										Building Your Application
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator className="hidden md:inline-flex" />
								<BreadcrumbItem>
									<BreadcrumbPage>Data Fetching</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</header>
					<div className="mx-auto w-full max-w-[960px] @container">
						<Outlet />
					</div>
				</SidebarInset>
			</div>
			<Toaster position="bottom-center" />
		</SidebarProvider>
	)
}
