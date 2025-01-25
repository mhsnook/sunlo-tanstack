/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class'],
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,html}'],
	theme: {
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
		},
		extend: {
			fontFamily: {
				sans: [
					'-apple-system',
					'BlinkMacSystemFont',
					'"Segoe UI"',
					'"Helvetica Neue"',
					'Oxygen-Sans',
					'Cantarell',
					'sans-serif',
				],
			},
			colors: {
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: 'hsl(var(--primary))',
				'primary-foreground': 'hsl(var(--primary-foreground))',
				secondary: 'hsl(var(--secondary))',
				'secondary-foreground': 'hsl(var(--secondary-foreground))',
				destructive: 'hsl(var(--destructive))',
				'destructive-foreground': 'hsl(var(--destructive-foreground))',
				muted: 'hsl(var(--muted))',
				'muted-foreground': 'hsl(var(--muted-foreground))',
				accent: 'hsl(var(--accent))',
				'accent-foreground': 'hsl(var(--accent-foreground))',
				popover: 'hsl(var(--popover))',
				'popover-foreground': 'hsl(var(--popover-foreground))',
				card: 'hsl(var(--card))',
				'card-foreground': 'hsl(var(--card-foreground))',
			},
			borderColor: {
				DEFAULT: 'hsl(var(--border))', // This is what controls the `border` class
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0',
					},
					to: {
						height: 'var(--radix-accordion-content-height)',
					},
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)',
					},
					to: {
						height: '0',
					},
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/container-queries'),
		require('tailwindcss-animate'),
	],
}
