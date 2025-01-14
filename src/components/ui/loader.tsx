import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

export function Loader({ className = '' }) {
	return <Loader2 className={cn('size-4 animate-spin opacity-70', className)} />
}
