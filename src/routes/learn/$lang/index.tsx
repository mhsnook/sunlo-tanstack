import { createFileRoute, Link } from '@tanstack/react-router'

import { buttonVariants } from '@/components/ui/button'
import type { FriendshipRow, LangOnlyComponentProps } from '@/types/main'
import { useProfile } from '@/lib/use-profile'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Book, NotebookPen, Search } from 'lucide-react'
import languages from '@/lib/languages'
import { ago } from '@/lib/dayjs'
import { useDeckMeta } from '@/lib/use-deck'

export const Route = createFileRoute('/learn/$lang/')({
	component: WelcomePage,
})

function WelcomePage() {
	const { lang } = Route.useParams()
	const deckIsNew = false
	return deckIsNew ?
			<Empty lang={lang} />
		:	<div className="space-y-4 px-2">
				<div className="flex gap-2 flex-row flex-wrap dark">
					<Link
						to="/learn/$lang/review"
						params={{ lang }}
						from={Route.fullPath}
						className={buttonVariants({ variant: 'default' })}
					>
						<Book /> Today&apos;s Deck Review
					</Link>
					<Link
						to="/learn/$lang/search"
						params={{ lang }}
						from={Route.fullPath}
						className={buttonVariants({ variant: 'secondary' })}
					>
						<Search /> Quick search
					</Link>
					<Link
						to="/learn/$lang/add-phrase"
						params={{ lang }}
						from={Route.fullPath}
						className={buttonVariants({ variant: 'secondary' })}
					>
						<NotebookPen /> Add a phrase
					</Link>
				</div>
				<DeckOverview lang={lang} />
				<FriendsSection lang={lang} />
				<DeckSettings lang={lang} />
			</div>
}

// TODO the database doesn't have friendships yet so this is all mockup-y
// and the type is also mocked
function FriendsSection({ lang }: LangOnlyComponentProps) {
	const profileQuery = useProfile()
	if (profileQuery.data === null) return null

	const friendsThisLanguage =
		profileQuery.data?.friendships?.filter(
			(f: FriendshipRow) => f.helping_with.indexOf(lang) !== -1
		) || []

	return (
		<Card>
			<CardHeader>
				<CardTitle>Your Friends</CardTitle>
				<CardDescription>
					NB: This "your friends" section is mock content for wireframe purposes
					only. The list below is not pulling from the database and doesn't
					reflect your actual friends list or their activities.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<p>Recent activity in this deck</p>
				<ul className="list-disc ml-4 mb-4">
					<li>mahesh (see recent activity or whatever)</li>
					<li>a-money (you have a new phrase from them)</li>
					<li>j-bhai (nothing special actually)</li>
				</ul>
				<Link
					to="/friends/search"
					search={{ lang }}
					from={Route.fullPath}
					className={buttonVariants({ variant: 'secondary' })}
				>
					Invite friends
				</Link>
			</CardContent>
		</Card>
	)
}

function DeckOverview({ lang }: LangOnlyComponentProps) {
	const { data } = useDeckMeta(lang)
	return (
		<Card>
			<CardHeader>
				<CardTitle>Deck Overview</CardTitle>
				<CardDescription>
					Quick stats on your deck and learning progress.
				</CardDescription>
			</CardHeader>
			<CardContent>Last review: {ago(data.most_recent_review_at)}</CardContent>
			<CardFooter>
				<div className="flex flex-row gap-2">
					<Link
						to="/learn/$lang/review"
						params={{ lang }}
						from={Route.fullPath}
						className={buttonVariants({ variant: 'default' })}
					>
						Review my cards
					</Link>
					<Link
						to="/learn/$lang/library"
						params={{ lang }}
						from={Route.fullPath}
						className={buttonVariants({ variant: 'secondary' })}
					>
						Find more {languages[lang]} phrases
					</Link>
					<Link
						to="/learn/$lang/add-phrase"
						params={{ lang }}
						from={Route.fullPath}
						className={buttonVariants({ variant: 'secondary' })}
					>
						Add a phrase
					</Link>
				</div>
			</CardFooter>
		</Card>
	)
}

function DeckSettings({ lang }: LangOnlyComponentProps) {
	const { data } = useDeckMeta(lang)

	return (
		<Card>
			<CardHeader>
				<CardTitle>Deck Settings</CardTitle>
				<CardDescription>
					Set your deck preferences and learning mode, activate or de-activate.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<ul className="list-disc ms-4">
					<li>
						Your deck is currently:{' '}
						<strong>{data.archived ? 'Inactive' : 'Active'}</strong>
					</li>
					<li>
						Your learning motivation is:{' '}
						<strong>
							{data?.learning_goal === 'family' ?
								'To connect with family'
							: data?.learning_goal === 'visiting' ?
								'Preparing to visit'
							:	'Living in a new place'}
						</strong>
					</li>
					<li>
						Your learning goals are: <strong>lorem upside downum</strong>
					</li>
				</ul>
				<Link
					to="/learn/$lang/deck-settings"
					params={{ lang }}
					from={Route.fullPath}
					className={buttonVariants({ variant: 'secondary' })}
				>
					Update Settings
				</Link>
			</CardContent>
		</Card>
	)
}


function Empty({ lang }: LangOnlyComponentProps) {
	return (
		<Card className="py-10">
			<CardHeader>
				<CardTitle>
					<h1 className="text-3xl font-bold mb-6">
						Welcome to Your New Language Journey!
					</h1>
				</CardTitle>
				<CardContent>
					<p className="text-lg mb-8">
						Let's get started by setting up your learning experience. Do you
						want to start by browsing the public deck of flash cards, or invite
						a friend to help you out?
					</p>
					<div className="flex flex-col gap-2 @lg:flex-row">
						<Link
							to="/learn/$lang/search"
							params={{ lang }}
							className={buttonVariants({ variant: 'secondary' })}
						>
							Search Cards
						</Link>

						<Link
							to="/friends"
							className={buttonVariants({ variant: 'secondary' })}
						>
							Invite a friend
						</Link>
					</div>
				</CardContent>
			</CardHeader>
		</Card>
	)
}
