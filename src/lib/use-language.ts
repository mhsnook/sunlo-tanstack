import {
	type UseQueryResult,
	queryOptions,
	useQuery,
} from '@tanstack/react-query'
import type {
	LanguageFetched,
	LanguageLoaded,
	LanguageMeta,
	PhrasesMap,
	PhraseFull,
	pids,
	uuid,
} from '@/types/main'
import supabase from '@/lib/supabase-client'
import { mapArray } from '@/lib/utils'

const qs = {
	phrase_full: () => `*, translations:phrase_translation(*)` as const,
	language_full: () => `*, phrases:phrase_plus(${qs.phrase_full()})` as const,
}

export async function fetchLanguage(lang: string): Promise<LanguageLoaded> {
	const { data } = await supabase
		.from('language_plus')
		.select(qs.language_full())
		.eq('lang', lang)
		.maybeSingle()
		.throwOnError()
	const { phrases: phrasesArray, ...meta }: LanguageFetched = data
	const pids: pids = phrasesArray?.map((p) => p.id)
	const phrasesMap: PhrasesMap = mapArray(phrasesArray, 'id')
	return {
		meta,
		pids,
		phrasesMap,
	}
}

export const languageQueryOptions = (lang: string) =>
	queryOptions({
		queryKey: ['language', lang],
		queryFn: async ({ queryKey }) => fetchLanguage(queryKey[1]),
		enabled: lang.length === 3,
		gcTime: 1_200_000,
		staleTime: 120_000,
		refetchOnWindowFocus: false,
	})

export const useLanguage = (lang: string) =>
	useQuery({ ...languageQueryOptions(lang) }) as UseQueryResult<LanguageLoaded>

export const useLanguageMeta = (lang: string) =>
	useQuery({
		...languageQueryOptions(lang),
		select: (data: LanguageLoaded) => data.meta,
	}) as UseQueryResult<LanguageMeta>

export const useLanguagePids = (lang: string) =>
	useQuery({
		...languageQueryOptions(lang),
		select: (data: LanguageLoaded) => data.pids,
	}) as UseQueryResult<pids>

export const useLanguagePhrasesMap = (lang: string) =>
	useQuery({
		...languageQueryOptions(lang),
		select: (data: LanguageLoaded) => data.phrasesMap,
	}) as UseQueryResult<PhrasesMap>

export const useLanguagePhrase = (pid: uuid, lang: string) =>
	useQuery({
		...languageQueryOptions(lang),
		select: (data: LanguageLoaded) => data.phrasesMap[pid],
	}) as UseQueryResult<PhraseFull>
