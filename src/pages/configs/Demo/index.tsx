import {
	useScript1Mutation,
	useScript2Mutation,
	useScript3Mutation,
	useScript4Mutation,
	useScript5Mutation,
	useScript6Mutation,
	useScript7Mutation,
	useScript8Mutation,
	useScript9Mutation,
} from '@/store/demo/api'
import {
	Stack,
	NumberInput,
	Center,
	Button,
	Modal,
	Group,
	Text,
	Divider,
} from '@mantine/core'
import { UseMutation } from '@reduxjs/toolkit/dist/query/react/buildHooks'
import useGlobalStyles from '@/utils/useGlobalStyles'
import { useState } from 'react'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'

const DemoScript = () => {
	const scripts: (ScriptActionProps & { id: string })[] = [
		{
			id: '1',
			mutation: useScript1Mutation,
			title: 'Đặt lịch cho ngẫu nhiên X người',
			label: 'Script 1',
		},
		{
			id: '2',
			mutation: useScript2Mutation,
			title: 'Thanh toán cho ngẫu nhiên X bệnh nhân đã đặt lịch khám',
			label: 'Script 2',
		},
		{
			id: '3',
			mutation: useScript3Mutation,
			title: 'Checkin cho ngẫu nhiên X người đã thanh toán',
			label: 'Script 3',
		},
		{
			id: '4',
			mutation: useScript4Mutation,
			title:
				'Hoàn thành ngẫu nhiên X bệnh án + đặt ngẫu nhiên đơn thuốc, mỗi đơn từ 6 đến 10 thuốc',
			label: 'Script 4',
		},
		{
			id: '5',
			mutation: useScript5Mutation,
			title: 'Đặt từ 1 đến 3 xét nghiệm cho X người ngẫu nhiên',
			label: 'Script 5',
		},
		{
			id: '6',
			mutation: useScript6Mutation,
			title: 'Thanh toán phí XN cho X người ngẫu nhiên',
			label: 'Script 6',
		},
		{
			id: '7',
			mutation: useScript7Mutation,
			title: 'Checkin cho X người ngẫu nhiên đã thanh toán phí xét nghiệm',
			label: 'Script 7',
		},
		{
			id: '8',
			mutation: useScript8Mutation,
			title: 'Hoàn thành tất cả xét nghiệm cho X bệnh án',
			label: 'Script 8',
		},
		{
			id: '9',
			mutation: useScript9Mutation,
			title: 'Checkin quay lại phòng khám cho X bệnh án',
			label: 'Script 9',
		},
	]

	return (
		<Stack>
			<Center p="xl">
				<Stack>
					{scripts.map((item) => (
						<ScriptAction {...item} key={item.id} />
					))}
				</Stack>
			</Center>
		</Stack>
	)
}

type ScriptActionProps = {
	mutation: UseMutation<any>
	title: string
	label: string
}
const ScriptAction = ({ mutation, title, label }: ScriptActionProps) => {
	const { classes } = useGlobalStyles()
	const [mutate, { isLoading }] = mutation()
	const [openModal, setOpenModal] = useState(false)

	const form = useForm({
		initialValues: {
			num: 1,
		},

		validate: {
			num: (value) => (value > 0 ? null : true),
		},
	})

	const handleSubmit = async (values: { num: number }) => {
		await mutate(values.num)
			.unwrap()
			.then(() => {
				showNotification({
					title: 'Thành công',
					message: <></>,
				})
				setOpenModal(false)
			})
			.catch((error) => {
				showNotification({
					title: error.data,
					message: <></>,
					color: 'red',
					autoClose: 10000,
				})
			})
	}
	return (
		<>
			<Group position="apart" spacing={20}>
				<Stack>
					<Text weight={500}>{label}</Text>
					<Text>{title}</Text>
				</Stack>
				<Button
					onClick={() => {
						setOpenModal(true)
					}}
				>
					Thực hiện
				</Button>
			</Group>
			<Divider />

			<Modal
				opened={openModal}
				centered={true}
				onClose={() => {
					setOpenModal(false)
					form.reset()
				}}
				title={title}
			>
				<form onSubmit={form.onSubmit(handleSubmit)}>
					<NumberInput
						label={label}
						data-autofocus
						className={classes.numberInput}
						min={1}
						{...form.getInputProps('num')}
					/>
					<Button fullWidth mt="md" type="submit" loading={isLoading}>
						Xác nhận
					</Button>
				</form>
			</Modal>
		</>
	)
}
export default DemoScript
