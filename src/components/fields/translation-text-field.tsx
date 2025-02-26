import type { FieldProps } from '.'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import ErrorLabel from './error-label'

export default function TranslationTextField({ register, error }: FieldProps) {
	return (
		<div>
			<Label>Phrase meaning</Label>
			<Textarea
				{...register('translation_text')}
				placeholder="Translation text"
			/>
			<ErrorLabel {...error} />
		</div>
	)
}
