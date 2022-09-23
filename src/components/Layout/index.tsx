import { ReactNode, useState } from 'react'
import { useMantineTheme, Box, Container, Stack } from '@mantine/core'
import SimpleHeader from './Header'

type LayoutAppShellProps = {
	children: ReactNode
}
const LayoutAppShell = ({ children }: LayoutAppShellProps) => {
	const theme = useMantineTheme()
	return (
		<Box
			sx={{
				width: '100vw',
				height: '100vh',
				background:
					theme.colorScheme === 'dark'
						? theme.colors.dark[8]
						: theme.colors.gray[2],
			}}
		>
			<Stack>
				<SimpleHeader />
				<Container size="xl" sx={{ width: '100%' }}>
					{children}
				</Container>
			</Stack>
		</Box>
	)
}

export default LayoutAppShell
