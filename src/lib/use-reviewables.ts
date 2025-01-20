import { queryOptions } from '@tanstack/react-query'
import supabase from './supabase-client'
import { ReviewInsert, uuid } from '@/types/main'

export const reviewablesQueryOptions = (lang: string, userId: uuid) => {
	// cache-key and shouldn't change with browser settings
	const today = new Date().toLocaleDateString('en-IN')
	return queryOptions({
		queryKey: ['user', userId, lang, 'reviewables', today],
		queryFn: async () =>
			(
				await supabase
					.from('user_card_review_today')
					.select()
					.eq('lang', lang)
					.throwOnError()
			).data,
		staleTime: Infinity,
		refetchInterval: Infinity,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
	})
}

export const postReview = async (submitData: ReviewInsert) => {
	if (!submitData?.user_card_id || !submitData?.review_time_score)
		throw new Error('Invalid review; cannot log')

	// if (prevId) submitData['id'] = prevId

	// console.log(`About to post the review,`, submitData, prevId)

	const { data } = await supabase
		.rpc('record_review_and_schedule', submitData)
		.throwOnError()

	// console.log(`We posted the review,`, data, error)
	return data
}
