import { createFileRoute, Link } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { NotebookPen, Search } from 'lucide-react'
import languages from '@/lib/languages'
import { Loader } from '@/components/ui/loader'
import supabase from '@/lib/supabase-client'
import {
	TranslationLanguageField,
	TranslationTextField,
} from '@/components/fields'
import { useRef } from 'react'
import { PhraseCardInsert } from '@/types/main'

interface SearchParams {
	text?: string
}

export const Route = createFileRoute('/learn/$lang/add-phrase')({
	validateSearch: (search: Record<string, unknown>): SearchParams => {
		return {
			text: (search?.text as string) ?? '',
		}
	},
	component: AddPhraseTab,
})

const addPhraseSchema = z.object({
	text: z.string().min(1, 'Please enter a phrase'),
	translation_lang: z
		.string()
		.length(3, 'Provide a language for the translation'),
	translation_text: z.string().min(1, 'Please enter the translation'),
})

type AddPhraseFormValues = z.infer<typeof addPhraseSchema>

function AddPhraseTab() {
	const navigate = Route.useNavigate()
	const { lang } = Route.useParams()
	const { text } = Route.useSearch()

	const refocusRef = useRef()

	const searchPhrase = text || ''
	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<AddPhraseFormValues>({
		resolver: zodResolver(addPhraseSchema),
		defaultValues: { text: searchPhrase },
	})

	const addPhraseMutation = useMutation({
		mutationFn: async (variables: AddPhraseFormValues) => {
			const ins: PhraseCardInsert = { lang, ...variables }
			const { data, error } = await supabase.rpc(
				'add_phrase_translation_card',
				ins
			)
			if (error) throw error
			return data
		},
		onSuccess: (data) => {
			toast.success(
				'New phrase has been added to the public library and will appear in your next review'
			)
			console.log(`Success:`, data)
			reset({ text: '', translation_text: '', translation_lang: '' })
			refocusRef?.current?.focus()
		},
		onError: (error) => {
			toast.error(
				`There was an error submitting this new phrase: ${error.message}`
			)
			console.log(`Error:`, error)
		},
	})

	return (
		<Card>
			<CardHeader>
				<CardTitle>Add A Phrase</CardTitle>
				<CardDescription>
					Search for a phrase or add a new one to your deck.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					noValidate
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					onSubmit={handleSubmit(
						addPhraseMutation.mutate as SubmitHandler<AddPhraseFormValues>
					)}
					className="space-y-4 mt-4"
				>
					<div>
						<Label htmlFor="newPhrase">
							Text of the Phrase (in {languages[lang]})
						</Label>
						<Controller
							name="text"
							control={control}
							render={({ field }) => (
								<Textarea
									{...field}
									placeholder="The text of the phrase to learn"
									autoFocus
									ref={refocusRef}
									onChange={(e) => {
										field.onChange(e)
										void navigate({
											to: '.',
											replace: true,
											search: (search: SearchParams) => ({
												...search,
												text: e.target.value,
											}),
										})
									}}
								/>
							)}
						/>
					</div>
					<TranslationLanguageField
						error={errors.translation_lang}
						control={control}
					/>
					<TranslationTextField
						error={errors.translation_text}
						register={register}
					/>
					<div className="flex flex-row gap-2">
						<Button type="submit" disabled={addPhraseMutation.isPending}>
							{addPhraseMutation.isPending ?
								<Loader />
							:	<NotebookPen />}
							Save and add another
						</Button>
						<Button variant="link" asChild>
							<Link
								to="/learn/$lang/search"
								from={Route.fullPath}
								search={(search: SearchParams) => ({ ...search, text })}
							>
								<Search />
								Search for similar phrases
							</Link>
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	)
}
