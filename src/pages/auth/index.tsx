import { AuthForm } from '@/entities/auth'
import { persistor } from '@/store'
import { useLoginMutation } from '@/store/auth/api'
import { createStyles, Image, Text } from '@mantine/core'
import { Stack } from '@mantine/core'
import {
	Paper,
	TextInput,
	PasswordInput,
	Button,
	Title,
	Checkbox,
	Center,
	Container,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { openModal } from '@mantine/modals'
import { useNavigate } from 'react-router-dom'

const useStyles = createStyles((theme) => ({
	layout: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 40,
	},
	imageHolder: {
		borderRadius: 4,
		maxWidth: 500,
		overflow: 'hidden',
		[`@media (max-width: ${theme.breakpoints.xl}px)`]: {
			display: 'none',
		},
	},
	formHolder: {
		maxWidth: 450,
		width: '100%',
		margin: '0 auto',
		position: 'relative',
	},
}))

const Login = () => {
	const { classes } = useStyles()
	const [login, { isLoading }] = useLoginMutation()

	const navigate = useNavigate()

	const form = useForm({
		initialValues: {
			username: '',
			password: '',
		},

		validate: {
			username: (value) => (value.length > 0 ? null : true),
			password: (value) => (value.length > 0 ? null : true),
		},
	})

	const onSubmit = async (values: AuthForm) => {
		persistor.persist()
		await login({ ...values })
			.unwrap()
			.then(() => navigate('/'))
			.catch((error) => {
				openModal({
					children: (
						<>
							<Text color="red" weight={'bold'}>
								Lỗi đăng nhập. Vui lòng thử lại!
							</Text>
						</>
					),
					withCloseButton: false,
					centered: true,
				})
				form.reset()
			})
	}

	return (
		<Center sx={{ width: '100vw', height: '100vh' }}>
			<Container>
				<Paper shadow="md" withBorder={true} p={30}>
					<form onSubmit={form.onSubmit(onSubmit)}>
						<Stack className={classes.layout}>
							<Stack justify="center" px={12} className={classes.formHolder}>
								<Title order={2} align="center" mt="md" mb={50}>
									Admin HABS
								</Title>

								<TextInput
									withAsterisk={true}
									label="Tài khoản"
									placeholder="admin"
									size="md"
									{...form.getInputProps('username')}
								/>
								<PasswordInput
									withAsterisk={true}
									autoComplete="current-password"
									label="Password"
									placeholder="123"
									mt="md"
									size="md"
									{...form.getInputProps('password')}
								/>

								<Button
									type="submit"
									fullWidth={true}
									mt="xl"
									size="md"
									loading={isLoading}
								>
									Đăng nhập
								</Button>
							</Stack>

							<Stack className={classes.imageHolder}>
								<Image src="images/auth-bg.jpg" />
							</Stack>
						</Stack>
					</form>
				</Paper>
			</Container>
		</Center>
	)
}

export default Login
