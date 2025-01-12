import { PhraseFull } from '@/types/main'

import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from './ui/dialog'
import { Button, ButtonProps } from './ui/button'
import { NotebookPen } from 'lucide-react'
import { SelectOneLanguage } from './select-one-language'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'

export function AddTranslationsDialog({
	phrase,
	...props
}: ButtonProps & {
	phrase: PhraseFull
}) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button {...props}>
					<NotebookPen /> Add another translation
				</Button>
			</DialogTrigger>
			<DialogContent className="w-[92%] max-w-[425px]">
				<DialogHeader className="text-left">
					<DialogTitle>Add translations</DialogTitle>
					<DialogDescription className="text-left space-y-2">
						<p>For the phrase &ldquo;{phrase.text}&rdquo;</p>
						<p>Please check to make sure you're not entering a duplicate:</p>
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
					</DialogDescription>
				</DialogHeader>
				<form noValidate onSubmit={() => {}} className="flex flex-col gap-4">
					<div>
						<Label>
							<span>Translation for</span>
						</Label>
						<SelectOneLanguage />
					</div>
					<div>
						<Label>
							<span className="mb-1">Phrase meaning</span>
						</Label>
						<Textarea />
					</div>
				</form>
				<DialogFooter className="flex flex-row justify-between">
					<Button variant="secondary">Cancel</Button>
					<Button variant="default">Add translation</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
