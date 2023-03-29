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
	Divider,
	ScrollArea,
} from '@mantine/core'
import { UseMutation } from '@reduxjs/toolkit/dist/query/react/buildHooks'
import useGlobalStyles from '@/utils/useGlobalStyles'
import { useState, useEffect, Fragment, useRef, useCallback } from 'react'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import DateTimePicker from '@/components/TimePicker'
import dayjs from 'dayjs'
import { formatDate } from '@/utils/formats'
import { IScriptResponse } from '@/entities/script'

const DemoScript = () => {
	const [time, setTime] = useState<Date | null>(new Date())
	const { data: now, isSuccess: isNowSuccess } = useGetNowQuery()
	const [mutateNow, { isLoading: isLoadingNow }] = useChangeNowMutation()

	useEffect(() => {
		if (isNowSuccess) {
			setTime(dayjs(now).toDate())
		}
	}, [isNowSuccess])

	const updateNow = async () => {
		if (!time) return
		await mutateNow(`${formatDate(time.toString(), 'YYYY-MM-DDTHH:mm:ss')}Z`)
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
		<Container size="xl" sx={{ width: '100%' }}>
			<Stack py="lg">
				<Paper p="md" sx={{ background: 'white' }}>
					<Group align="end">
						<DateTimePicker
							locale="vi"
							label="Thay đổi thời gian khám"
							value={time}
							onChange={setTime}
							sx={{ flex: 1, maxWidth: 300 }}
						/>
						<Stack sx={{ flex: 1 }} align="start">
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
	const [mutate] = mutation()
	const [isLoading, setIsLoading] = useState(false)
	const [openModal, setOpenModal] = useState(false)
	const [messages, setMessages] = useState<string[]>([])
	const [messageBatch, setMessageBatch] = useState<string[][]>([])
	const [isUpdateMessage, setIsUpdateMessage] = useState(false)
	const myTimer = useRef<NodeJS.Timer | null>(null)
	const viewport = useRef<HTMLDivElement>(null)
	const scrollToBottom = () =>
		viewport?.current?.scrollTo({
			top: viewport?.current?.scrollHeight,
			behavior: 'smooth',
		})

	const form = useForm({
		initialValues: {
			num: 1,
		},

		validate: {
			num: (value) => (value > 0 ? null : true),
		},
	})

	const handleSubmit = async (values: { num: number }) => {
		setOpenModal(false)
		setMessages([])
		setMessageBatch([])
		setIsUpdateMessage(false)
		setIsLoading(true)
		await mutate(values.num)
			.unwrap()
			.then((resp) => {
				const result = resp as IScriptResponse
				const mock = {
					messages: [
						'Test A',
						'Test A',
						'Test A',
						'Test A',
						'Test A',
						'Test A',
						'Test A',
						'Test A',
						'Test A',
						'Test A',
						'Test A',
						'Test A',
						'Test A',
						'Test A',
						'Test A',
						'aaTest Aaa',
						'aaaa',
						'aaaaaa',
						'aaaaaaa',
						'aaaaa',
						'aaaaa',
						'aaaa',
						'aaaa',
						'aaaaaa',
						'aaaaaaa',
						'aaaaa',
						'aaaaa',
						'aaaa',
						'aaaa',
						'aaaaaa',
						'aaaaaaa',
						'aaaaa',
						'aaaaa',
						'aaaa',
						'aaaa',
						'aaaaaa',
					],
				}
				setMessages(result?.messages || mock.messages)
				setIsUpdateMessage(true)
				setOpenModal(false)
			})
			.catch((error) => {
				showNotification({
					title: error.data,
					message: <></>,
					color: 'red',
					autoClose: 10000,
				})
				setIsLoading(false)
			})
	}

	useEffect(() => {
		if (!isUpdateMessage) return
		function startTimer(_messages: string[]) {
			let i = 0
			myTimer.current = setInterval(() => {
				if (i < _messages.length) {
					const batchSize = Math.floor(Math.random() * 5) + 3
					const batch = _messages.slice(i, i + batchSize)
					setMessageBatch((prevBatches) => [...prevBatches, batch])
					i += batchSize
				} else {
					if (myTimer?.current) clearInterval(myTimer.current)
					setIsLoading(false)
				}
				scrollToBottom()
			}, 250)
		}
		startTimer(messages)
		return () => {
			if (myTimer?.current) return clearInterval(myTimer.current)
		}
	}, [isUpdateMessage, messages])

	return (
		<Fragment>
			<Paper p="md" sx={{ backgroundColor: 'white' }}>
				<Group position="apart" align="baseline" spacing={'xl'}>
					<Stack sx={{ flex: 1 }}>
						<Text weight={500} sx={{ maxWidth: 700 }}>
							{title}
						</Text>
						<Button
							onClick={() => {
								setOpenModal(true)
							}}
							sx={{ width: 'fit-content' }}
							loading={isLoading}
						>
							Thực hiện
						</Button>
					</Stack>
					<Paper sx={{ flex: '1' }} p="md">
						<Stack>
							<Stack spacing={'xs'}>
								<Text weight={500}>Output console</Text>
								<Divider />
							</Stack>
							<ScrollArea.Autosize maxHeight={300} viewportRef={viewport}>
								<Stack sx={{ minHeight: 100 }}>
									{messageBatch?.map((batch, index) => (
										<Stack spacing={1} key={index}>
											{batch?.map((message, messageIndex) => (
												<p key={messageIndex}>{message}</p>
											))}
										</Stack>
									))}
								</Stack>
							</ScrollArea.Autosize>
						</Stack>
					</Paper>
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
