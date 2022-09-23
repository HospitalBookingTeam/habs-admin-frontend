import { createStyles, keyframes } from '@mantine/core'

const useGlobalStyles = createStyles((theme, _params, getRef) => ({
	numberInput: {
		input: {
			textAlign: 'right',
			paddingLeft: '12px',
		},
		'input:has(+ div)': {
			paddingRight: '32px',
		},
	},
	width60: {
		'input:has(+ div)': {
			paddingRight: '60px',
		},
	},
	accordion: {
		border: `2px solid ${theme.colors.gray[2]}`,
	},
}))

export const bounce = keyframes({
	'from, 20%, 53%, 80%, to': { transform: 'translate3d(0, 0, 0)' },
	'40%, 43%': { transform: 'translate3d(0, -30px, 0)' },
	'70%': { transform: 'translate3d(0, -15px, 0)' },
	'90%': { transform: 'translate3d(0, -4px, 0)' },
})
export default useGlobalStyles
