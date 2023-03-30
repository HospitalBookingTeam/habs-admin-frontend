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

	const scripts: ScriptActionProps[] = [
		{
			scriptId: '1',
			mutation: useScript1Mutation,
			title: 'Đặt lịch cho ngẫu nhiên X người',
			label: 'Script 1',
		},
		{
			scriptId: '2',
			mutation: useScript2Mutation,
			title: 'Thanh toán cho ngẫu nhiên X bệnh nhân đã đặt lịch khám',
			label: 'Script 2',
		},
		{
			scriptId: '3',
			mutation: useScript3Mutation,
			title: 'Checkin cho ngẫu nhiên X người đã thanh toán',
			label: 'Script 3',
		},
		{
			scriptId: '4',
			mutation: useScript4Mutation,
			title:
				'Hoàn thành ngẫu nhiên X bệnh án + đặt ngẫu nhiên đơn thuốc, mỗi đơn từ 6 đến 10 thuốc',
			label: 'Script 4',
		},
		{
			scriptId: '5',
			mutation: useScript5Mutation,
			title: 'Đặt từ 1 đến 3 xét nghiệm cho X người ngẫu nhiên',
			label: 'Script 5',
		},
		{
			scriptId: '6',
			mutation: useScript6Mutation,
			title: 'Thanh toán phí XN cho X người ngẫu nhiên',
			label: 'Script 6',
		},
		{
			scriptId: '7',
			mutation: useScript7Mutation,
			title: 'Checkin cho X người ngẫu nhiên đã thanh toán phí xét nghiệm',
			label: 'Script 7',
		},
		{
			scriptId: '8',
			mutation: useScript8Mutation,
			title: 'Hoàn thành tất cả xét nghiệm cho X bệnh án',
			label: 'Script 8',
		},
		{
			scriptId: '9',
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
					<ScriptAction {...item} key={item.scriptId} />
				))}
			</Stack>
		</Container>
	)
}

type ScriptActionProps = {
	mutation: UseMutation<any>
	title: string
	label: string
	scriptId: string
}
const ScriptAction = ({
	mutation,
	title,
	label,
	scriptId,
}: ScriptActionProps) => {
	const isScript1 = scriptId === '1'
	const { classes } = useGlobalStyles()
	const [mutate] = mutation()
	const [isLoading, setIsLoading] = useState(false)
	const [openModal, setOpenModal] = useState(false)
	const [messages, setMessages] = useState<string[]>([])
	const [messageBatch, setMessageBatch] = useState<string[][]>([])
	const [isUpdateMessage, setIsUpdateMessage] = useState(false)
	const [isDoneSignal, setIsDoneSignal] = useState(false)

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

	const runSignal = (num: number) => {
		if (!isScript1) return
		setIsDoneSignal(false)

		let i = 0

		const runResponse = () => {
			if (i === 0) {
				const message1 = ['Đang dọn dẹp dữ liệu test cũ']
				setMessageBatch((prevBatches) => [...prevBatches, message1])
				setTimeout(runResponse, 500)
			}
			if (i === 1) {
				const message2 = [
					'Dọn dẹp dữ liệu test thành công',
					`Tiến hành đặt lịch khám cho ${num} người`,
				]
				setMessageBatch((prevBatches) => [...prevBatches, message2])
				setIsDoneSignal(true)
			}
			i++
			scrollToBottom()
		}
		setTimeout(runResponse, 750)
	}

	const handleSubmit = async (values: { num: number }) => {
		setOpenModal(false)

		setIsUpdateMessage(false)
		setIsLoading(true)
		runSignal(values.num)
		await mutate(values.num)
			.unwrap()
			.then((resp) => {
				const result = resp as IScriptResponse
				setMessages(result?.messages)
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
		if (!isUpdateMessage || (isScript1 && !isDoneSignal)) return
		function startTimer(_messages: string[]) {
			let i = 0

			const runResponse = () => {
				if (i < _messages.length) {
					const batchSize = Math.floor(Math.random() * 5) + 3
					const batch = _messages.slice(i, i + batchSize)
					setMessageBatch((prevBatches) => [...prevBatches, batch])
					i += batchSize
					myTimer.current = setTimeout(runResponse, 350)
				} else {
					if (myTimer?.current) clearTimeout(myTimer.current)
					setIsLoading(false)
				}
				scrollToBottom()
			}
			myTimer.current = setTimeout(runResponse, 350)
		}
		startTimer(messages)
		return () => {
			if (myTimer?.current) return clearTimeout(myTimer.current)
		}
	}, [isUpdateMessage, isDoneSignal, messages])

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
								<Stack sx={{ minHeight: 100 }} spacing={0}>
									{messageBatch?.map((batch, index) => (
										<Stack spacing={0} key={index}>
											{batch?.map((message, messageIndex) => (
												<div key={messageIndex}>{message}</div>
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
