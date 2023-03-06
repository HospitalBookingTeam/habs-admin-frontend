import { useState, useEffect } from 'react'
import {
	createStyles,
	Navbar,
	Tooltip,
	UnstyledButton,
	Text,
	Stack,
	useMantineTheme,
	MediaQuery,
	Group,
	Box,
	Divider,
} from '@mantine/core'
import {
	IconList,
	IconZoomCheck,
	IconLogout,
	IconPackage,
	TablerIcon,
	IconTimeline,
	IconHome,
} from '@tabler/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { logout } from '@/store/auth/slice'
import { selectAuth } from '@/store/auth/selectors'
import { useMediaQuery, useViewportSize } from '@mantine/hooks'
import { persistor } from '@/store'
import { clearConfig } from '@/store/configs/slice'

const useStyles = createStyles((theme, _params, getRef) => {
	const icon: string = getRef('icon')
	return {
		navbar: {
			position: 'fixed',
			top: 0,
			zIndex: 9999,
		},
		title: {
			textTransform: 'uppercase',
			letterSpacing: -0.25,
			color: theme.white,
		},

		footer: {
			paddingTop: theme.spacing.xs,
			marginTop: theme.spacing.xs,
			borderTop: `1px solid ${theme.colors.gray[4]}`,
		},

		link: {
			...theme.fn.focusStyles(),
			display: 'flex',
			alignItems: 'center',
			textDecoration: 'none',
			fontSize: theme.fontSizes.sm,
			color: theme.colors.gray[7],
			padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
			borderRadius: theme.radius.sm,
			fontWeight: 500,
			width: '100%',

			'&:hover': {
				backgroundColor: theme.colors.gray[1],
			},
			[`@media (max-width: ${theme.breakpoints.lg}px)`]: {
				span: {
					fontSize: theme.fontSizes.xs,
				},
			},
		},

		linkActive: {
			'&, &:hover': {
				backgroundColor: theme.colors.gray[1],
				[`& .${icon}`]: {
					opacity: 0.9,
				},
			},
		},
	}
})

const data = [
	{ link: '', secondLink: '/', label: 'Dashboard', icon: IconHome },
	{ link: '/configs', label: 'Configurations', icon: IconPackage },
	{ link: '/records', label: 'Danh sách khám bệnh', icon: IconList },
	{ link: '/schedule', label: 'Lịch khám bệnh', icon: IconTimeline },
]

interface NavbarLinkProps {
	icon: TablerIcon
	label: string
	active?: boolean
	onClick?: React.MouseEventHandler<HTMLButtonElement>
}

function NavbarLinkMobile({
	icon: Icon,
	label,
	active,
	onClick,
}: NavbarLinkProps) {
	const { classes, cx } = useStyles()
	const theme = useMantineTheme()
	const matches = useMediaQuery(`(max-width: ${theme.breakpoints.lg}px)`)
	return (
		<Tooltip
			label={label}
			position="right"
			transitionDuration={0}
			hidden={!matches}
		>
			<UnstyledButton
				onClick={onClick}
				className={cx(classes.link, { [classes.linkActive]: active })}
			>
				<Group align="center">
					<Icon stroke={1.5} style={{ flex: 1 }} />

					<MediaQuery
						query={`(max-width: ${theme.breakpoints.lg}px)`}
						styles={{ display: 'none' }}
					>
						<span>{label}</span>
					</MediaQuery>
				</Group>
			</UnstyledButton>
		</Tooltip>
	)
}

export function NavbarSimpleColored({ opened }: { opened: boolean }) {
	const location = useLocation()
	const { classes, cx } = useStyles()
	const [active, setActive] = useState(location.pathname)
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const authData = useAppSelector(selectAuth)

	const theme = useMantineTheme()
	const matches = useMediaQuery(`(max-width: ${theme.breakpoints.lg}px)`)
	const { width } = useViewportSize()

	const links = data.map((item) => (
		<NavbarLinkMobile
			key={item.label}
			onClick={(event) => {
				event.preventDefault()
				setActive(item.link)
				navigate(item.link)
			}}
			icon={item.icon}
			label={item.label}
			active={active === item.link || active === item?.secondLink}
		/>
	))

	useEffect(() => {
		if (!authData?.isAuthenticated) {
			navigate('/login')
		}
	}, [authData])

	return (
		<Navbar
			p={matches ? 'xs' : 'md'}
			width={{ base: 75, lg: 250 }}
			className={classes.navbar}
			sx={{
				background: 'white',
				left: `calc(max((100vw - min(1440px, ${width}px)), (min(1440px, ${width}px) - 100vw)) / 2)`,
			}}
		>
			<Navbar.Section grow>
				<Stack>
					<Text size="lg" align="center" weight="bolder">
						Admin
					</Text>
					<Divider />
					<Stack spacing={'xs'}>{links}</Stack>
				</Stack>
			</Navbar.Section>

			<Navbar.Section className={classes.footer}>
				<NavbarLinkMobile
					icon={IconLogout}
					label="Đăng xuất"
					onClick={() => {
						dispatch(logout())
						dispatch(clearConfig())
						persistor.pause()
						persistor.flush().then(() => {
							return persistor.purge()
						})
					}}
				/>
			</Navbar.Section>
		</Navbar>
	)
}
