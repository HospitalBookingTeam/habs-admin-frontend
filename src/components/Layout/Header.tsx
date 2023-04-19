import { selectAuth } from '@/store/auth/selectors'
import { logout } from '@/store/auth/slice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
	createStyles,
	Container,
	Button,
	Group,
	Text,
	UnstyledButton,
	Badge,
} from '@mantine/core'
import { useSpotlight } from '@mantine/spotlight'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Clock from '../Clock'

const useStyles = createStyles((theme) => ({
	header: {
		marginBottom: 0,
		position: 'fixed',
		top: 0,
		width: '100%',
		height: 40,
		zIndex: 99,
		borderBottom: `1px solid ${theme.colors.gray[2]}`,
	},

	mainSection: {
		height: '100%',
	},
	searchInput: {
		minWidth: 250,
		height: 32,
		paddingLeft: theme.spacing.sm,
		paddingRight: 5,
		borderRadius: theme.radius.md,
		color:
			theme.colorScheme === 'dark'
				? theme.colors.dark[2]
				: theme.colors.gray[5],
		backgroundColor:
			theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
		border: `1px solid ${
			theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
		}`,

		'&:hover': {
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.fn.rgba(theme.colors.dark[5], 0.85)
					: theme.fn.rgba(theme.colors.gray[0], 0.85),
		},
	},
}))

const SimpleHeader = () => {
	const { classes } = useStyles()
	const spotlight = useSpotlight()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const authData = useAppSelector(selectAuth)
	const location = useLocation()

	const isViewRecordsHistory = location.pathname.includes('records')
	const isViewTestsHistory = location.pathname.includes('tests')

	const handleHomeClick = () => {
		if (!isViewRecordsHistory && !isViewTestsHistory) {
			navigate('/')
			return
		}
		if (isViewRecordsHistory) {
			navigate('/?tabs=checkup_record')
			return
		}
		if (isViewTestsHistory) {
			navigate('/?tabs=test_record')
			return
		}
	}

	useEffect(() => {
		if (!authData?.isAuthenticated) {
			navigate('/login')
		}
	}, [authData])

	return (
		<div className={classes.header}>
			<Container size="xl" className={classes.mainSection}>
				<Group
					position="right"
					align="center"
					sx={{ height: '100%', backgroundColor: 'white' }}
				>
					{/* {!isViewRecordsHistory && !isViewTestsHistory && (
						<UnstyledButton
							className={classes.searchInput}
							onClick={() => spotlight.openSpotlight()}
						>
							<Group spacing="xs">
								<IconSearch size={14} stroke={1.5} />
								<Text size="sm" color="dimmed" pr={80}>
									Tìm kiếm config
								</Text>
							</Group>
						</UnstyledButton>
					)} */}
					{/* {isViewRecordsHistory && <Badge size="lg">LỊCH SỬ KHÁM BỆNH</Badge>}
					{isViewTestsHistory && <Badge size="lg">KẾT QUẢ XÉT NGHIỆM</Badge>} */}
					<Clock />
				</Group>
			</Container>
		</div>
	)
}

export default SimpleHeader
