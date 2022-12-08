import {
	createStyles,
	Title,
	Text,
	Button,
	Container,
	Group,
} from '@mantine/core'
import { useNavigate } from 'react-router-dom'

const useStyles = createStyles((theme) => ({
	root: {
		paddingTop: 80,
		paddingBottom: 80,
		width: '100%',
	},

	label: {
		textAlign: 'center',
		fontWeight: 900,
		fontSize: 220,
		lineHeight: 1,
		marginBottom: theme.spacing.xl * 1.5,
		color:
			theme.colorScheme === 'dark'
				? theme.colors.dark[4]
				: theme.colors.gray[2],

		[theme.fn.smallerThan('sm')]: {
			fontSize: 120,
		},
	},

	title: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		textAlign: 'center',
		fontWeight: 900,
		fontSize: 38,

		[theme.fn.smallerThan('sm')]: {
			fontSize: 32,
		},
	},

	description: {
		maxWidth: 500,
		margin: 'auto',
		marginTop: theme.spacing.xl,
		marginBottom: theme.spacing.xl * 1.5,
	},
}))

const NotFound = () => {
	const { classes } = useStyles()
	const navigate = useNavigate()

	return (
		<Container className={classes.root}>
			<div className={classes.label}>404</div>
			<Title className={classes.title}>
				Bạn đã truy cập vào 1 vùng chưa ai khám phá.
			</Title>
			<Text
				color="dimmed"
				size="lg"
				align="center"
				className={classes.description}
			>
				Có thể bạn đã vào đường link không đúng.
			</Text>
			<Group position="center">
				<Button variant="subtle" size="md" onClick={() => navigate('/')}>
					Về trang chủ
				</Button>
			</Group>
		</Container>
	)
}

export default NotFound
