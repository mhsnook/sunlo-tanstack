import { createFileRoute, Link } from '@tanstack/react-router'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Loader } from '@/components/ui/loader'
import { useRelations } from '@/lib/friends'
import { ShowError } from '@/components/errors'
import { ProfileWithRelationship } from '@/components/profile-with-relationship'
import Flagged from '@/components/flagged'
import { uuid } from '@/types/main'
import Callout from '@/components/ui/callout'

type FriendsIndexProps = {
	request_uid: uuid
}

export const Route = createFileRoute('/_user/friends/')({
	validateSearch: (search: Record<string, unknown>): FriendsIndexProps => {
		return {
			request_uid: (search.request_uid as string) || '',
		}
	},
	component: FriendListPage,
})

function FriendListPage() {
	return (
		<main className="flex flex-col gap-6">
			<FriendProfiles />
			<Flagged name="friends_activity">
				<FriendsActivity />
			</Flagged>
			<PendingRequestsSection />
		</main>
	)
}

function PendingRequestsSection() {
	const { request_uid }: FriendsIndexProps = Route.useSearch()
	const { data, isPending, error } = useRelations()

	return (
		<Card>
			<CardHeader>
				<CardTitle>Friend requests sent</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				{isPending ?
					<Loader />
				: error ?
					<ShowError>{error.message}</ShowError>
				:	<>
						<Callout>
							<ProfileWithRelationship
								profile={data?.relationsMap[request_uid].profile}
							/>
						</Callout>
						{!(data?.uids.invited.length > 0) ?
							<p>You don't have any requests pending at this time.</p>
						:	data.uids.invited
								.filter((uid) => uid !== request_uid)
								.map((uid) => (
									<ProfileWithRelationship
										key={uid}
										profile={data?.relationsMap[uid].profile}
									/>
								))
						}
					</>
				}
			</CardContent>
		</Card>
	)
}

function FriendProfiles() {
	const { data, isPending, error } = useRelations()
	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Your friends</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-2">
						{isPending ?
							<Loader />
						: error ?
							<></>
						: !(data?.uids.friends?.length > 0) ?
							<p>
								Your friends list is empty for now. Use{' '}
								<Link
									className="s-link"
									from={Route.fullPath}
									to="/friends/search"
								>
									the search screen
								</Link>{' '}
								to find friends on Sunlo or{' '}
								<Link
									className="s-link"
									from={Route.fullPath}
									to="/friends/invite"
								>
									invite them to create an account
								</Link>
								.
							</p>
						:	data?.uids.friends.map((uid) => (
								<ProfileWithRelationship
									key={uid}
									profile={data?.relationsMap[uid].profile}
								/>
							))
						}
					</div>
				</CardContent>
			</Card>
		</>
	)
}

// TODO the database doesn't have friendships yet so this is all mockup-y
// and the type is also mocked
function FriendsActivity() {
	const { data, isPending } = useRelations()

	return isPending ?
			<Loader />
		:	<Card>
				<CardHeader>
					<CardTitle>Your Friends</CardTitle>
					<CardDescription>
						NB: This is just sample activity; there's no database object yet for
						friend-viewable user activity
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<ul className="ml-4 list-disc">
						{data.uids.friends.map((uid) => {
							const d = data.relationsMap[uid]
							return !d.profile ? null : (
									<li key={uid}>
										<Link
											to="/friends/$uid"
											params={{ uid }}
											className="s-link"
										>
											{d.profile.username}
										</Link>{' '}
										<Flagged name="friends_activity">
											<span className="opacity-70">was doing something</span>
										</Flagged>
									</li>
								)
						})}
					</ul>
				</CardContent>
			</Card>
}
