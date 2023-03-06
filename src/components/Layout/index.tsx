import { ReactNode, useState } from 'react'
import {
	useMantineTheme,
	Box,
	Container,
	Stack,
	Group,
	createStyles,
} from '@mantine/core'
import SimpleHeader from './Header'
import { NavbarSimpleColored } from '../NavBar'

type LayoutAppShellProps = {
	children: ReactNode
}

const useStyles = createStyles((theme, _params, getRef) => {
	const icon: string = getRef('icon')
	return {
		content: {
			marginLeft: 80,
			[`@media (min-width: ${theme.breakpoints.lg}px)`]: {
				marginLeft: 250,
			},
		},
	}
})

const LayoutAppShell = ({ children }: LayoutAppShellProps) => {
	const theme = useMantineTheme()
	const { classes } = useStyles()
	return (
		<Stack
			sx={{
				width: '100vw',
				height: '100vh',
				background:
					theme.colorScheme === 'dark'
						? theme.colors.dark[8]
						: theme.colors.gray[2],
			}}
		>
			<SimpleHeader />
			<NavbarSimpleColored opened />

			<Container
				size="xl"
				sx={{ width: '100%', marginTop: 55, paddingBottom: 30 }}
			>
				<Box sx={{ flex: 1 }} className={classes.content}>
					<Stack sx={{ maxWidth: '100%' }}>{children}</Stack>
				</Box>
			</Container>
		</Stack>
	)
}

export default LayoutAppShell
