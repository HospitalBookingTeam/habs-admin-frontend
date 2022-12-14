import { IconSelector, IconChevronDown, IconChevronUp } from '@tabler/icons'
import { ThProps } from '../types'
import {
	createStyles,
	UnstyledButton,
	Group,
	Text,
	Center,
} from '@mantine/core'

const useStyles = createStyles((theme) => ({
	th: {
		padding: '0 !important',
	},
	control: {
		width: '100%',
		padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
		'&:hover': {
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.colors.dark[6]
					: theme.colors.gray[0],
		},
	},
	icon: {
		width: 21,
		height: 21,
		borderRadius: 21,
	},
}))

const Th = ({ children, reversed, sorted, onSort, width }: ThProps) => {
	const { classes } = useStyles()
	const Icon = sorted
		? reversed
			? IconChevronUp
			: IconChevronDown
		: IconSelector
	return (
		<th className={classes.th} style={{ width }}>
			<UnstyledButton onClick={onSort} className={classes.control}>
				<Group position="apart">
					<Text weight={500} size="sm">
						{children}
					</Text>
					<Center className={classes.icon}>
						<Icon size={14} stroke={1.5} />
					</Center>
				</Group>
			</UnstyledButton>
		</th>
	)
}
export default Th
