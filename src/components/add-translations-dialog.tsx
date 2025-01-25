import { PhraseFull } from '@/types/main'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { NotebookPen } from 'lucide-react'

import supabase from '@/lib/supabase-client'
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from './ui/dialog'
import { Button } from './ui/button'
import { ButtonProps } from './ui/button-variants'
import { TranslationLanguageField, TranslationTextField } from './fields'
import { useRef } from 'react'

const AddTranslationsInputs = z.object({
	translation_lang: z.string().length(3),
	translation_text: z.string().min(1),
})
type AddTranslationsType = z.infer<typeof AddTranslationsInputs>

export function AddTranslationsDialog({
	phrase,
	...props
}: ButtonProps & {
	phrase: PhraseFull
}) {
	const {
		handleSubmit,
		register,
		control,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<AddTranslationsType>({
		defaultValues: { translation_text: '', translation_lang: 'eng' },
		resolver: zodResolver(AddTranslationsInputs),
	})
	const closeRef = useRef<HTMLButtonElement>()
	const close = () => closeRef.current?.click()
	const queryClient = useQueryClient()

	const addTranslation = useMutation({
		mutationKey: ['add-translation', phrase.id, phrase.lang],
		mutationFn: async ({
			translation_lang,
			translation_text,
		}: AddTranslationsType) => {
			const { data } = await supabase
				.from('phrase_translation')
				.insert({
					lang: translation_lang,
					text: translation_text,
					phrase_id: phrase.id,
				})
				.throwOnError()
				.select()
			return data[0]
		},
		onSuccess: () => {
			toast.success(`Translation added for ${phrase.text}`)
			close()
			reset()
			void queryClient.invalidateQueries({
				queryKey: ['language', phrase.lang],
			})
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	return (
		<Dialog>
			<DialogTrigger asChild ref={closeRef}>
				<Button {...props}>
					<NotebookPen /> Add another translation
				</Button>
			</DialogTrigger>
			<DialogContent className="w-[92%] max-w-[425px]">
				<DialogHeader className="text-left">
					<DialogTitle>Add translations</DialogTitle>
					<DialogDescription className="text-left space-y-2">
						For the phrase &ldquo;{phrase.text}&rdquo;
					</DialogDescription>
				</DialogHeader>
				<div className="text-muted-foreground text-sm space-y-2">
					<p>Please check to make sure you're not entering a duplicate.</p>
					<ol className="space-y-2">
						{phrase.translations.map((trans) => (
							<li key={trans.id}>
								<span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-xs mr-2">
									{trans.lang}
								</span>
								<span>{trans.text}</span>
							</li>
						))}
					</ol>
				</div>
				<form
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					onSubmit={handleSubmit(
						addTranslation.mutate as SubmitHandler<AddTranslationsType>
					)}
					noValidate
				>
					<fieldset
						className="flex flex-col gap-4 mb-4"
						disabled={isSubmitting}
					>
						<TranslationLanguageField
							control={control}
							error={errors.translation_lang}
							tabIndex={1}
						/>
						<TranslationTextField
							register={register}
							error={errors.translation_text}
						/>
					</fieldset>
					<DialogFooter className="flex flex-row justify-between">
						<Button disabled={isSubmitting} variant="secondary">
							Cancel
						</Button>
						<Button variant="default">Add translation</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
