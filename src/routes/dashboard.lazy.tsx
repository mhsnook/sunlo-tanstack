import { createLazyFileRoute } from '@tanstack/react-router'
import { AppSidebar } from '@/components/app-sidebar'
import { Separator } from '@/components/ui/separator'
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from '@/components/ui/sidebar'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

export const Route = createLazyFileRoute('/dashboard')({
	component: Page,
})

function Page() {
	return (
		<SidebarProvider>
			<div className="flex h-screen overflow-hidden">
				<AppSidebar />
				<SidebarInset className="flex-1">
					<main className="flex-1 overflow-y-auto p-6">
						<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
							<Card>
								<CardHeader>
									<CardTitle className="text-lg">Card 1</CardTitle>
									<CardDescription>Card description</CardDescription>
								</CardHeader>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle className="text-lg">Card 2</CardTitle>
									<CardDescription>Card description</CardDescription>
								</CardHeader>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle className="text-lg">Card 3</CardTitle>
									<CardDescription>Card CardDescription</CardDescription>
								</CardHeader>
							</Card>
						</div>
						<Card>
							<CardHeader>
								<CardTitle>Main Content Area</CardTitle>
							</CardHeader>
							<CardContent>
								This is where your main content would go. You can add more
								components, tables, charts, or any other content here.
							</CardContent>
						</Card>
					</main>
				</SidebarInset>
			</div>
		</SidebarProvider>
	)
}
