import {
	Check,
	ChevronsUpDown,
	MonitorCog,
	Moon,
	Sun,
	SunMoon,
} from 'lucide-react'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from '@/components/theme-provider'
import { cn } from '@/lib/utils'
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from './ui/sidebar'

export function ModeToggle() {
	const { theme, setTheme } = useTheme()
	const { isMobile } = useSidebar()

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Sun className="h-[1.3rem] w-[1.3rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
							<Moon className="absolute h-[1.3rem] w-[1.3rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
							<span>
								<span className="capitalize">{theme}</span> mode
							</span>
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>

					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						side={isMobile ? 'bottom' : 'right'}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuItem
							className={theme === 'light' ? 'bg-primary/10' : ''}
							onClick={() => setTheme('light')}
						>
							{theme === 'light' ?
								<Check className="mr-2 h-4 w-4" />
							:	<Sun className="mr-2 h-4 w-4" />}
							Light
						</DropdownMenuItem>
						<DropdownMenuItem
							className={theme === 'dark' ? 'bg-primary/10' : ''}
							onClick={() => setTheme('dark')}
						>
							{theme === 'dark' ?
								<Check className="mr-2 h-4 w-4" />
							:	<Moon className="mr-2 h-4 w-4" />}
							Dark
						</DropdownMenuItem>
						<DropdownMenuItem
							className={theme === 'system' ? 'bg-primary/10' : ''}
							onClick={() => setTheme('system')}
						>
							{theme === 'system' ?
								<Check className="mr-2 h-4 w-4" />
							:	<MonitorCog className="mr-2 h-4 w-4" />}
							System
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
