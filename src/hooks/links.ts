import {
	BookCopy,
	FolderPlus,
	HeartHandshake,
	Home,
	NotebookPen,
	Rocket,
	Search,
	Send,
	Settings,
} from 'lucide-react'
import languages from '../lib/languages'
import { useMemo } from 'react'
import { LinkType } from '@/types/main'
import { useParams } from '@tanstack/react-router'

const links = (lang?: string): Record<string, LinkType> => ({
	'/friends': {
		name: 'Contacts',
		title: 'Friends and contacts',
		Icon: HeartHandshake,
		link: {
			to: '/friends',
		},
	},
	'/friends/search': {
		name: 'Search',
		title: 'Search profiles',
		Icon: Search,
		link: {
			to: '/friends/search',
		},
	},
	'/friends/invite': {
		name: 'Invite',
		title: 'Invite to Sunlo',
		Icon: Send,
		link: {
			to: '/friends/invite',
		},
	},
	'/profile': {
		name: 'Profile',
		title: 'Edit profile',
		Icon: NotebookPen,
		link: {
			to: '/profile',
		},
	},
	'/learn': {
		name: 'Home',
		title: 'Learning home',
		Icon: Home,
		link: {
			to: '/learn',
		},
	},
	'/learn/add-deck': {
		name: 'Deck',
		title: 'Start a new language',
		Icon: FolderPlus,
		link: {
			to: '/learn/add-deck',
		},
	},
	'/learn/$lang/search': {
		name: `Search`,
		title: `Quick search ${languages[lang]}`,
		link: {
			to: '/learn/$lang/search',
			params: { lang },
		},
		Icon: Search,
	},
	'/learn/$lang/deck-settings': {
		name: 'Settings',
		title: 'Deck settings',
		link: {
			to: '/learn/$lang/deck-settings',
			params: { lang },
		},
		Icon: Settings,
	},
	'/learn/$lang/review': {
		name: 'Review',
		title: 'Start a review',
		link: {
			to: '/learn/$lang/review',
			params: { lang },
		},
		Icon: Rocket,
	},
	'/learn/$lang/library': {
		name: `Library`,
		title: `Browse ${languages[lang]} library`,
		link: {
			to: '/learn/$lang/library',
			params: { lang },
		},
		Icon: BookCopy,
	},
	'/learn/$lang/add-phrase': {
		name: 'Phrase',
		title: 'Add a phrase',
		link: {
			to: '/learn/$lang/add-phrase',
			params: { lang },
		},
		Icon: NotebookPen,
	},
	'/learn/quick-search': {
		name: 'Search',
		title: 'Quick search',
		link: {
			to: '/learn/quick-search',
		},
		Icon: Search,
	},
})

export function useLinks(paths: Array<string>) {
	const { lang } = useParams({ strict: false })
	return useMemo(() => makeLinks(paths, lang), [lang])
}

export function makeLinks(paths: Array<string>, lang?: string) {
	const l = links(lang)
	return paths.map((p) => l[p])
}
