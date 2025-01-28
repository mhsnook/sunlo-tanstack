import type { ReactNode } from '@tanstack/react-router'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { Separator } from '@/components/ui/separator'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

export function AppSidebarLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex h-screen overflow-hidden w-full">
			<AppSidebar />
			<SidebarInset className="flex-1 w-full">
				<header className="hidden h-16 shrink-0 items-center gap-2 border-b px-6">
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
				<div
					id="app-sidebar-layout-outlet"
					className="w-app @container overflow-y-auto pb-6"
				>
					{children}
				</div>
			</SidebarInset>
		</div>
	)
}
