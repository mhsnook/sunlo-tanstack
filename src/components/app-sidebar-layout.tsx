import type { ReactNode } from '@tanstack/react-router'
import { SidebarInset } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'

export function AppSidebarLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex h-screen overflow-hidden w-full">
			<AppSidebar />
			<SidebarInset className="flex-1 w-full">
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
