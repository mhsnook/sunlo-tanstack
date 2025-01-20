import type { FieldError } from 'react-hook-form'

export default function ErrorLabel(error: FieldError) {
	return !error.message ? null : (
			<p className="text-sm text-destructive dark:text-red-400 mt-2">
				{error.message}
			</p>
		)
}
