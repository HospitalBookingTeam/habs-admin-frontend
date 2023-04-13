import { useGetStatisticsQuery } from '@/store/record/api'
import {
	Badge,
	Box,
	Center,
	Divider,
	Grid,
	Group,
	Paper,
	RingProgress,
	SimpleGrid,
	Stack,
	Table,
	Text,
	useMantineTheme,
} from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { useEffect, useState } from 'react'
import 'dayjs/locale/vi'
import { IconCalendar } from '@tabler/icons'
import { useAppSelector } from '@/store/hooks'
import { selectTime } from '@/store/configs/selectors'
import dayjs from 'dayjs'
import { formatDate } from '@/utils/formats'

const Statistic = () => {
	const { colors } = useMantineTheme()
	const configTime = useAppSelector(selectTime)

	const [value, setValue] = useState<Date | null>(
		new Date(dayjs().valueOf() + (configTime ?? 0))
	)

	const { data, isLoading } = useGetStatisticsQuery(
		{
			from: value
				? `${formatDate(value.toString(), 'YYYY-MM-DDT00:00:00')}Z`
				: undefined,
			to: value
				? `${formatDate(value.toString(), 'YYYY-MM-DDT23:59:59')}Z`
				: undefined,
		},
		{
			refetchOnMountOrArgChange: true,
			refetchOnFocus: true,
		}
	)

	const dataForCheckup = [
		{
			value: data?.bookedAndPaidCount,
			label: 'Đã đặt lịch',
			color: 'teal',
		},
		{
			value: data?.checkedInCount,
			label: 'Đợi khám (đã checkin)',
			color: 'yellow',
		},
		{
			value: data?.inProgressCount,
			label: 'Đang trong quá trình khám',
			color: 'cyan',
		},
		{
			value: data?.testArrangedCount,
			label: 'Đợi xét nghiệm',
			color: 'grape',
		},
		{
			value: data?.finishedCount,
			label: 'Hoàn thành khám bệnh',
			color: 'green',
		},
	]
	const dataForTest = [
		{
			value: data?.testRecords?.checkedInCount,
			label: 'Đợi xét nghiệm (đã checkin)',
			color: colors.cyan[2],
		},
		{
			value: data?.testRecords?.testInProgressCount,
			label: 'Đang tiến hành',
			color: colors.indigo[2],
		},
		{
			value: data?.testRecords?.operationFinishedCount,
			label: 'Đợi kết quả',
			color: colors.orange[2],
		},
		{
			value: data?.testRecords?.resultFilledCount,
			label: 'Hoàn thành xét nghiệm',
			color: colors.green[2],
		},
	]
	const rows = dataForCheckup?.map((row) => {
		return (
			<tr key={row.label}>
				<td>
					<Group>
						<Badge variant="filled" size="xs" color={row.color} />
						{row?.label}
					</Group>
				</td>
				<td align="right">{row.value}</td>
			</tr>
		)
	})

	const bookViaAppVsAnonymous =
		Math.round(
			((data?.phoneUserCount ?? 0) /
				((data?.phoneUserCount ?? 0) + (data?.annonymousCount ?? 0) ?? 1)) *
				100
		) || 0
	const bookAnonymousVsViaApp =
		Math.round(
			((data?.annonymousCount ?? 0) /
				((data?.phoneUserCount ?? 0) + (data?.annonymousCount ?? 0) ?? 1)) *
				100
		) || 0

	useEffect(() => {
		setValue(new Date(dayjs().valueOf() + (configTime ?? 0)))
	}, [configTime])

	return (
		<Paper sx={{ background: 'transparent' }}>
			<Stack sx={{ minHeight: 'calc(100vh - 100px)' }}>
				<Box sx={{ maxWidth: 210 }}>
					<DatePicker
						icon={<IconCalendar size="1.25rem" />}
						placeholder="Chọn ngày"
						size="md"
						value={value}
						onChange={setValue}
						locale="vi"
					/>
				</Box>

				<Grid grow align="stretch">
					<Grid.Col span={8}>
						<Paper p="sm" sx={{ backgroundColor: 'white', height: '100%' }}>
							<Stack spacing={'xs'}>
								<Text size="lg" weight="bolder">
									Thống kê người khám bệnh
								</Text>
								<Divider />
							</Stack>
							<Table verticalSpacing={'sm'} striped fontSize="md">
								<thead>
									<tr>
										<th>Trạng thái</th>
										<th align="right" style={{ textAlign: 'right' }}>
											Số lượng
										</th>
									</tr>
								</thead>
								<tbody>{rows}</tbody>
							</Table>
						</Paper>
					</Grid.Col>
					<Grid.Col span={4}>
						<Paper p="sm" sx={{ backgroundColor: 'white', height: '100%' }}>
							<Stack>
								<Stack spacing={'xs'}>
									<Text size="lg" weight="bolder">
										Thống kê người dùng đăng ký
									</Text>
									<Divider />
								</Stack>
								<Stack p="md">
									<Center>
										<RingProgress
											label={
												<Stack align="center" spacing="xs">
													<Text size="xs">Tổng cộng</Text>
													<Text size="xl" weight="bold">
														{(data?.annonymousCount ?? 0) +
															(data?.phoneUserCount ?? 0)}
													</Text>
												</Stack>
											}
											size={180}
											thickness={20}
											sections={[
												{ value: bookViaAppVsAnonymous, color: 'green' },
												{ value: bookAnonymousVsViaApp, color: 'orange' },
											]}
										/>
									</Center>
									<Stack sx={{ flex: 1 }}>
										<Group position="apart">
											<Box>
												<Badge variant="dot" size="lg" fullWidth>
													mobile app ({data?.phoneUserCount ?? 0} người)
												</Badge>
											</Box>
											<Text>{bookViaAppVsAnonymous}%</Text>
										</Group>
										<Group spacing={4} position="apart">
											<Box>
												<Badge variant="dot" size="lg" color="orange" fullWidth>
													Vãng lai ({data?.annonymousCount} người)
												</Badge>
											</Box>
											<Text>{bookAnonymousVsViaApp}%</Text>
										</Group>
									</Stack>
								</Stack>
							</Stack>
						</Paper>
					</Grid.Col>
					<Grid.Col span={12} sx={{ minHeight: 200 }}>
						<Paper p="sm" sx={{ backgroundColor: 'white', height: '100%' }}>
							<Stack spacing={'xs'}>
								<Text size="lg" weight="bolder">
									Thống kê danh sách xét nghiệm
								</Text>
								<Divider />

								<SimpleGrid cols={2}>
									{dataForTest?.map((item) => (
										<Paper
											withBorder
											shadow="xs"
											p="sm"
											key={item.label}
											sx={{
												backgroundColor: 'white',
												borderColor: item.color,
											}}
										>
											<Stack spacing="xs">
												<Text size="xl" weight="bolder">
													{item.value}{' '}
													<Text span size="sm" weight="normal">
														{item.label}
													</Text>
												</Text>
											</Stack>
										</Paper>
									))}
								</SimpleGrid>
							</Stack>
						</Paper>
					</Grid.Col>
				</Grid>
			</Stack>
		</Paper>
	)
}
export default Statistic
