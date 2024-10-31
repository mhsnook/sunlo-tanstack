import { type FieldProps, ErrorLabel } from '.'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function EmailField({ register, error }: FieldProps) {
	return (
		<div className="flex flex-col gap-1">
			<Label htmlFor="email" className={error ? 'text-destructive' : ''}>
				Email
			</Label>
			<Input
				{...register('email')}
				inputMode="email"
				aria-invalid={!!error}
				tabIndex={1}
				type="email"
				className={error ? 'bg-destructive/20' : ''}
				placeholder="email@domain"
			/>
			<ErrorLabel {...error} />
		</div>
	)
}
