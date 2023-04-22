import {
	useLazyGetScheduleByDoctorQuery,
	useLazyGetSlotsByDoctorQuery,
} from '@/store/configs/api'
import { useGetNowQuery } from '@/store/demo/api'
import {
	Badge,
	Button,
	Center,
	Divider,
	Group,
	Indicator,
	Modal,
	Paper,
	Stack,
	Tabs,
	Text,
	Title,
} from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import 'dayjs/locale/vi'
import { IResult, handleIScheduleResponse } from './utils'
import { formatDate } from '@/utils/formats'
import { IScheduleSlotOfDoctor } from '@/entities/schedule'
import { translateSession } from '@/utils/enums'

const Schedule = () => {
	const [time, setTime] = useState<Date | null>(new Date())
	const { data: now, isSuccess: isNowSuccess } = useGetNowQuery(undefined, {
		refetchOnMountOrArgChange: true,
	})
	const [schedule, setSchedule] = useState<IResult>()
	const [isOpen, setIsOpen] = useState(false)
	const [doctorName, setDoctorName] = useState('')
	const [doctorSchedule, setDoctorSchedule] =
		useState<IScheduleSlotOfDoctor[]>()

	useEffect(() => {
		if (isNowSuccess) {
			setTime(dayjs(now).toDate())
		}
	}, [isNowSuccess])

	const [
		triggerGetSchedule,
		{ isLoading: isLoadingSchedule, isFetching: isFetchingSchedule },
	] = useLazyGetScheduleByDoctorQuery()

	const [triggerGetSlotsOfDoctor, { isLoading: isLoadingSlots }] =
		useLazyGetSlotsByDoctorQuery()

	const handleGetSchedule = async () => {
		if (!time) return
		await triggerGetSchedule({
			date: `${formatDate(time?.toString(), 'YYYY-MM-DDTHH:mm:ss')}Z`,
		})
			.unwrap()
			.then((resp) => {
				setSchedule(handleIScheduleResponse(resp))
			})
	}
	const getSlotsForDoctor = async (id: number) => {
		if (!time) return
		await triggerGetSlotsOfDoctor({
			date: `${formatDate(time?.toString(), 'YYYY-MM-DDTHH:mm:ss')}Z`,
			doctorId: id.toString(),
		})
			.unwrap()
			.then((resp) => {
				setDoctorSchedule(resp)
				setIsOpen(true)
			})
	}
	const tabs = doctorSchedule?.filter((ses) => ses.slots?.length)

	return (
		<Stack>
			<Title order={3}>Theo dõi lịch khám</Title>
			<Paper p="md" sx={{ background: 'white' }}>
				<Center>
					<Group align="end">
						<DatePicker
							locale="vi"
							label="Thời gian"
							value={time}
							onChange={setTime}
							sx={{ flex: 1, maxWidth: 300 }}
						/>
						<Button
							onClick={handleGetSchedule}
							loading={isLoadingSchedule || isFetchingSchedule}
						>
							Lấy lịch
						</Button>
					</Group>
				</Center>
				<Stack>
					{!!schedule &&
						schedule.map((dep) => (
							<Stack key={dep.department}>
								<Text weight="bolder" size="lg">
									{dep.department}
								</Text>
								<Group>
									{!!dep.value?.length ? (
										dep.value.map((doctor) => (
											<Button
												key={doctor.id}
												onClick={() => {
													getSlotsForDoctor(doctor.id)
													setDoctorName(doctor.name)
												}}
												variant="outline"
												loading={isLoadingSlots && doctorName === doctor.name}
											>
												BS. {doctor.name}
											</Button>
										))
									) : (
										<Text>Không có bác sĩ phụ trách</Text>
									)}
								</Group>
								<Divider />
							</Stack>
						))}
				</Stack>
			</Paper>

			<Modal
				opened={isOpen}
				onClose={() => setIsOpen(false)}
				title={'Lịch khám trong ngày'}
				size="lg"
			>
				<Stack>
					<Stack spacing={'xs'}>
						<Text>
							Thời gian: {formatDate(dayjs(time).toString(), 'DD/MM/YYYY')}
						</Text>
						<Text>Bác sĩ {doctorName}</Text>
					</Stack>
					{!!tabs?.length && (
						<Tabs defaultValue={tabs[0].session.toString()}>
							<Tabs.List>
								{tabs.map((tab) => (
									<Tabs.Tab key={tab.session} value={tab.session.toString()}>
										<Text>{translateSession(tab.session)}</Text>
									</Tabs.Tab>
								))}
							</Tabs.List>
							{tabs.map((tab) => (
								<Tabs.Panel key={tab.session} value={tab.session.toString()}>
									<Stack pt="md">
										<Text>
											Phòng {tab.roomNumber} - Tầng {tab.floor}
										</Text>
										<Stack spacing={'sm'}>
											{tab.slots?.map((slot) => (
												<Group
													key={`${slot.estimatedStartTime}-${tab.session}`}
												>
													<Text>
														{formatDate(slot.estimatedStartTime, 'HH:mm')}
													</Text>
													<Badge
														color={
															slot.isFinished
																? 'red'
																: slot.isAvailable
																? 'green'
																: 'gray'
														}
													>
														{slot.isFinished
															? `Đã hoàn thành khám`
															: slot.isAvailable
															? 'Có thể đặt'
															: `Đã đặt`}
													</Badge>
													<Text size="sm">
														{slot.isFinished || !slot.isAvailable
															? slot?.patientName
															: ''}
													</Text>
												</Group>
											))}
										</Stack>
									</Stack>
								</Tabs.Panel>
							))}
						</Tabs>
					)}
					{/* <Stack>
						{doctorSchedule
							?.filter((ses) => ses?.slots?.length)
							?.map((ses) => (
								<Stack key={ses.session}>
									<Stack spacing={0}>
										<Text weight="bolder">
											Ca {translateSession(ses.session)}
										</Text>
										<Text>
											Phòng {ses.roomNumber} - Tầng {ses.floor}
										</Text>
									</Stack>
									<Stack spacing={'sm'}>
										{ses.slots?.map((slot) => (
											<Group key={`${slot.estimatedStartTime}-${ses.session}`}>
												<Text>
													{formatDate(slot.estimatedStartTime, 'HH:mm')}
												</Text>
												<Badge
													color={
														slot.isFinished
															? 'red'
															: slot.isAvailable
															? 'green'
															: 'gray'
													}
												>
													{slot.isFinished
														? `Đã hoàn thành khám`
														: slot.isAvailable
														? 'Có thể đặt'
														: `Đã đặt`}
												</Badge>
												<Text size="sm">
													{slot.isFinished || !slot.isAvailable
														? slot?.patientName
														: ''}
												</Text>
											</Group>
										))}
									</Stack>
									<Divider />
								</Stack>
							))}
					</Stack> */}
				</Stack>
			</Modal>
		</Stack>
	)
}
export default Schedule
