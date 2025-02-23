type FlagMap = {
	[key: string]:
		| {
				enabled: boolean
				disabled?: boolean
		  }
		| {
				disabled: boolean
				enabled?: boolean
		  }
}
export const flags: FlagMap = {
	smart_recommendations: { enabled: false },
}
