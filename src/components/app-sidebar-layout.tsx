import type { ReactNode } from '@tanstack/react-router'
import { SidebarInset } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'

export function AppSidebarLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex h-screen w-full overflow-hidden">
			<AppSidebar />
			<SidebarInset className="w-full flex-1">
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
