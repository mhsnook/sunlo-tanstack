import { createFileRoute, Link, useRouter } from '@tanstack/react-router'

import { NotebookPen, Plus, Search } from 'lucide-react'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import languages from '@/lib/languages'
import { uuid } from '@/types/main'
import { useLanguage, useLanguagePhrasesMap } from '@/lib/use-language'
import { useMemo } from 'react'
import { LanguagePhrasesAccordionComponent } from '@/components/language-phrases-accordion'

interface SearchParams {
	text?: string
}

export const Route = createFileRoute('/learn/$lang/search')({
	validateSearch: (search: Record<string, unknown>): SearchParams => {
		return {
			text: (search.text as string) || '',
		}
	},
	component: SearchTab,
})

type SearchablePhrase = {
	pid: uuid
	text: string
}

function SearchTab() {
	const { navigate } = useRouter()
	const { lang } = Route.useParams()
	const { text: filter } = Route.useSearch()

	const {
		data: { phrasesMap, pids },
	} = useLanguage(lang)
	const searchablePhrases: Array<SearchablePhrase> = useMemo(() => {
		return pids.map((pid: uuid) => {
			return {
				pid,
				text: [
					phrasesMap[pid].text,
					...phrasesMap[pid].translations.map((t) => t.text),
				].join(', '),
			}
		})
	}, [phrasesMap])

	const searchResults = useMemo(() => {
		if (!filter.trim()) return pids
		return searchablePhrases
			.filter((searchable: SearchablePhrase) => {
				return searchable.text.toUpperCase().indexOf(filter.toUpperCase()) > -1
			})
			.map((s) => s.pid)
	}, [filter, searchablePhrases, pids])

	return (
		<Card>
			<CardHeader>
				<CardTitle>Search {languages[lang]}</CardTitle>
				<CardDescription>Search for a phrases to learn</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<div>
					<Label htmlFor="phrase">Phrase</Label>
					<Input
						placeholder="Enter a phrase to search or add"
						autoFocus
						onChange={(e) => {
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
				</div>
				<div className="flex flex-row gap-2">
					<Button type="submit">
						<Search /> Search Phrase
					</Button>
					<Button variant="link" asChild>
						<Link
							to="/learn/$lang/add-phrase"
							from={Route.fullPath}
							search={(search: SearchParams) => ({ ...search, filter })}
						>
							<NotebookPen />
							Add New Phrase
						</Link>
					</Button>
				</div>

				{searchResults?.length > 0 ?
					<LanguagePhrasesAccordionComponent lang={lang} pids={searchResults} />
				:	<p className="text-center text-muted-foreground mt-4">
						No results found. Try searching for a phrase or add a new one.
					</p>
				}
			</CardContent>
		</Card>
	)
}
