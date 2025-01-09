import supabase from '@/lib/supabase-client'
import {
	type UseQueryResult,
	queryOptions,
	useQuery,
} from '@tanstack/react-query'

import type {
	CardsMap,
	DeckFetched,
	DeckMeta,
	DeckLoaded,
	CardFull,
	uuid,
	pids,
} from '@/types/main'
import { mapArray } from '@/lib/utils'
import { useAuth } from '@/lib/hooks'

const qs = {
	card_full: `*, phrase(reviews:user_card_review_plus(*))` as const,
	deck_full: () => `*, cards:user_card_plus(${qs.card_full})` as const,
}

async function fetchDeck(lang: string): Promise<DeckLoaded> {
	const { data } = await supabase
		.from('user_deck_plus')
		.select(qs.deck_full())
		.eq('lang', lang)
		.maybeSingle()
		.throwOnError()
	const { cards: cardsArray, ...meta }: DeckFetched = data
	const pids: pids = cardsArray?.map((c) => c.phrase_id)
	const cardsMap: CardsMap = mapArray(cardsArray, 'phrase_id')
	return {
		meta,
		pids,
		cardsMap,
	}
}

export const deckQueryOptions = (lang: string, userId: uuid) =>
	queryOptions({
		queryKey: ['user', lang],
		queryFn: async ({ queryKey }) => fetchDeck(queryKey[1]),
		enabled: !!userId && !!lang,
		gcTime: 1_200_000,
		staleTime: 120_000,
		refetchOnWindowFocus: false,
	})
export const useDeck = (lang: string) => {
	const { userId } = useAuth()
	return useQuery({
		...deckQueryOptions(lang, userId),
	}) as UseQueryResult<DeckLoaded>
}

export const useDeckMeta = (lang: string) => {
	const { userId } = useAuth()
	return useQuery({
		...deckQueryOptions(lang, userId),
		select: (data: DeckLoaded) => data.meta,
	}) as UseQueryResult<DeckMeta>
}

// @TODO replace this with a memoized select on data.cards
export const useDeckPids = (lang: string) => {
	const { userId } = useAuth()
	return useQuery({
		...deckQueryOptions(lang, userId),
		select: (data: DeckLoaded) => data.pids,
	}) as UseQueryResult<pids>
}

export const useDeckCardsMap = (lang: string) => {
	const { userId } = useAuth()
	return useQuery({
		...deckQueryOptions(lang, userId),
		select: (data: DeckLoaded) => data.cardsMap,
	}) as UseQueryResult<CardsMap>
}

export const useDeckCard = (pid: uuid, lang: string) => {
	const { userId } = useAuth()
	return useQuery({
		...deckQueryOptions(lang, userId),
		select: (data: DeckLoaded) => data.cardsMap[pid],
	}) as UseQueryResult<CardFull>
}
