import {
	useChangeNowMutation,
	useGetNowQuery,
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
	Button,
	Modal,
	Group,
	Text,
	Paper,
	Container,
} from '@mantine/core'
import { UseMutation } from '@reduxjs/toolkit/dist/query/react/buildHooks'
import useGlobalStyles from '@/utils/useGlobalStyles'
import { useState, useEffect, Fragment } from 'react'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import DateTimePicker from '@/components/TimePicker'
import dayjs from 'dayjs'
import { convertTimeToLocal, formatDate } from '@/utils/formats'

const DemoScript = () => {
	const [time, setTime] = useState<Date | null>(new Date())
	const { data: now, isSuccess: isNowSuccess } = useGetNowQuery()
	const [mutateNow, { isLoading: isLoadingNow }] = useChangeNowMutation()

	console.log(
		'now',
		time,
		formatDate(time?.toString() ?? '', 'YYYY-MM-DDTHH:mm:ss+00:00')
	)
	useEffect(() => {
		if (isNowSuccess) {
			setTime(dayjs(now).toDate())
		}
	}, [isNowSuccess])

	const updateNow = async () => {
		if (!time) return
		await mutateNow(convertTimeToLocal(time.toString()))
			.unwrap()
			.then(() => {
				showNotification({
					title: 'Thành công',
					message: <></>,
				})
			})
			.catch((error) => {
				showNotification({
					title: 'Không thành công',
					message: <></>,
					color: 'red',
					autoClose: 5000,
				})
			})
	}

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
		<Container size="xl">
			<Stack py="lg">
				<Paper p="md" sx={{ background: 'white' }}>
					<Group align="end">
						<DateTimePicker
							locale="vi"
							label="Script 0: Thay đổi thời gian"
							value={time}
							onChange={setTime}
							sx={{ flex: 1, maxWidth: 300 }}
						/>
						<Stack sx={{ flex: 1 }} align="end">
							<Button
								onClick={updateNow}
								loading={isLoadingNow}
								disabled={!time}
							>
								Cập nhật
							</Button>
						</Stack>
					</Group>
				</Paper>
				{scripts.map((item) => (
					<ScriptAction {...item} key={item.id} />
				))}
			</Stack>
		</Container>
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
		<Fragment>
			<Paper p="md" sx={{ backgroundColor: 'white' }}>
				<Group position="apart" spacing={'xl'}>
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
			</Paper>
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
		</Fragment>
	)
}
export default DemoScript
