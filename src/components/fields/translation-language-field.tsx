import { SelectOneLanguage } from '@/components/select-one-language'
import { Label } from '@/components/ui/label'
import { useController } from 'react-hook-form'
import { ErrorLabel, type ControlledFieldProps } from '.'

export default function TranslationLanguageField({
	control,
	error,
}: ControlledFieldProps) {
	const controller = useController({ name: 'lang', control })
	// console.log(`Controller is: `, controller)

	return (
		<div className="flex flex-col gap-1">
			<Label htmlFor="lang" className={error ? 'text-destructive' : ''}>
				Translation for
			</Label>
			<SelectOneLanguage
				value={controller.field.value}
				setValue={controller.field.onChange}
				hasError={!!error}
			/>
			<ErrorLabel {...error} />
		</div>
	)
}
