import { useContext, useEffect, useState } from 'react'
import supabase from '@/lib/supabase-client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { AuthContext } from '@/components/auth-context'

// Access the context's value from inside a provider
export function useAuth() {
	const context = useContext(AuthContext)

	if (context === null) {
		throw new Error('You need to wrap AuthProvider.')
	}
	return context
}

export const useSignOut = () => {
	const navigate = useNavigate()
	const client = useQueryClient()

	return useMutation({
		mutationFn: async () => await supabase.auth.signOut(),
		onSuccess: () => {
			client.removeQueries({ queryKey: ['user'], exact: false })
			void navigate({ to: '/' })
		},
	})
}

export function useActiveElement() {
	const [activeElement, setActiveElement] = useState(
		() => window.document.activeElement
	)
	useEffect(() => {
		const onFocus = () => setActiveElement(window.document.activeElement)
		const onBlur = () => setActiveElement(null)
		window.addEventListener('focus', onFocus)
		window.addEventListener('blur', onBlur)
		return () => {
			window.removeEventListener('focus', onFocus)
			window.removeEventListener('blur', onBlur)
		}
	}, [window])

	return activeElement
}
