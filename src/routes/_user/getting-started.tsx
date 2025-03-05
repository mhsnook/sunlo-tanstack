import { createFileRoute, Navigate } from '@tanstack/react-router'
import { useAuth } from '@/lib/hooks'
import ProfileCreationForm from '@/components/profile-creation-form'
import { useProfile } from '@/lib/use-profile'
import { Loader } from '@/components/ui/loader'
import SuccessCheckmark from '@/components/SuccessCheckmark'

export const Route = createFileRoute('/_user/getting-started')({
	component: GettingStartedPage,
})

function GettingStartedPage() {
	const { userId, userRole } = useAuth()
	const { data: profile } = useProfile()

	const nextPage =
		userRole === 'learner' ? '/learn/add-deck' : '/friends/request'

	return (
		profile === undefined ? <Loader />
		: profile !== null ? <Navigate to={nextPage} />
		: <main className="w-app px-[5cqw] py-10">
				<div className="my-4 space-y-4 text-center">
					<h1 className="d1">Welcome to Sunlo</h1>
					<div className="mx-auto flex max-w-sm flex-row items-center gap-4">
						<SuccessCheckmark className="bg-transparent" />
						<p className="text-muted-foreground text-2xl font-thin">
							Thanks&nbsp;for&nbsp;confirming your email &ndash; let&apos;s
							get&nbsp;you&nbsp;set&nbsp;up.
						</p>
					</div>
				</div>
				<ProfileCreationForm userId={userId} />
			</main>
	)
}
