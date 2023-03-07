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
	Stack,
	Table,
	Text,
	useMantineTheme,
} from '@mantine/core'

const Statistic = () => {
	const { data, isLoading } = useGetStatisticsQuery(
		{},
		{
			refetchOnMountOrArgChange: true,
			refetchOnFocus: true,
		}
	)
	const { colors } = useMantineTheme()

	const dataForCheckup = [
		{
			value: data?.bookedAndPaidCount,
			label: 'Đã thanh toán phí khám bệnh',
			color: 'teal',
		},
		{
			value: data?.checkedInCount,
			label: 'Đã checkin',
			color: 'lime',
		},
		{
			value: data?.inProgressCount,
			label: 'Đang trong quá trình khám',
			color: 'cyan',
		},
		{
			value: data?.testArrangedCount,
			label: 'Đợi thanh toán phí xét nghiệm',
			color: 'blue',
		},
		{
			value: data?.testPaidCount,
			label: 'Đợi checkin xét nghiệm',
			color: 'grape',
		},
		{
			value: data?.testResultsReadyCount,
			label: 'Đã đầy đủ kết quả xét nghiệm',
			color: 'pink',
		},
		{
			value: data?.checkedInAfterTestsCount,
			label: 'Đã checkin sau khi đủ kết quả xét nghiệm',
			color: 'yellow',
		},
		{
			value: data?.finishedCount,
			label: 'Hoàn thành khám bệnh',
			color: 'green',
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
			((data?.appUserCount ?? 0) /
				((data?.appUserCount ?? 0) + (data?.annonymousCount ?? 0) ?? 1)) *
				100
		) || 0
	const bookAnonymousVsViaApp =
		Math.round(
			((data?.annonymousCount ?? 0) /
				((data?.appUserCount ?? 0) + (data?.annonymousCount ?? 0) ?? 1)) *
				100
		) || 0

	return (
		<Paper sx={{ background: 'transparent' }}>
			<Stack sx={{ minHeight: 'calc(100vh - 100px)' }}>
				<Grid grow align="stretch">
					<Grid.Col span={8}>
						<Paper p="sm" sx={{ backgroundColor: 'white', height: '100%' }}>
							<Stack spacing={'xs'}>
								<Text size="lg" weight="bolder">
									Thống kê người khám bệnh
								</Text>
								<Divider />
							</Stack>
							<Table striped fontSize="sm">
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
															(data?.appUserCount ?? 0)}
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
												<Badge variant="dot" size="lg">
													Sử dụng app ({data?.appUserCount ?? 0} người)
												</Badge>
											</Box>
											<Text>{bookViaAppVsAnonymous}%</Text>
										</Group>
										<Group spacing={4} position="apart">
											<Box>
												<Badge variant="dot" size="lg" color="orange">
													Khách vãng lai ({data?.annonymousCount} người)
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

								<Group grow py="sm" spacing="md">
									<Paper
										withBorder
										shadow="xs"
										p="sm"
										sx={{
											backgroundColor: 'white',
											borderColor: colors.teal[2],
										}}
									>
										<Stack spacing="xs">
											<Text size="xl" weight="bolder">
												{data?.testRecords?.notPaidCount}{' '}
												<Text span size="sm" weight="normal">
													chưa thanh toán
												</Text>
											</Text>
											<Text size="xl" weight="bolder">
												{data?.testRecords?.paidCount}{' '}
												<Text span size="sm" weight="normal">
													đã thanh toán
												</Text>
											</Text>
										</Stack>
									</Paper>
									<Paper
										withBorder
										p="xs"
										shadow="xs"
										sx={{
											backgroundColor: 'white',
											borderColor: colors.indigo[2],
										}}
									>
										<Stack spacing="xs">
											<Text size="xl" weight="bolder">
												{data?.testRecords?.checkedInCount}{' '}
												<Text span size="sm" weight="normal">
													đã check in
												</Text>
											</Text>
											<Text size="xl" weight="bolder">
												{data?.testRecords?.testInProgressCount}{' '}
												<Text span size="sm" weight="normal">
													đang xét nghiệm
												</Text>
											</Text>
										</Stack>
									</Paper>
									<Paper
										withBorder
										p="xs"
										shadow="xs"
										sx={{
											backgroundColor: 'white',
											borderColor: colors.orange[2],
										}}
									>
										<Stack spacing="xs">
											<Text size="xl" weight="bolder">
												{data?.testRecords?.operationFinishedCount}{' '}
												<Text span size="sm" weight="normal">
													đợi kết quả xét nghiệm
												</Text>
											</Text>
											<Text size="xl" weight="bolder">
												{data?.testRecords?.resultFilledCount}{' '}
												<Text span size="sm" weight="normal">
													đã có kết quả xét nghiệm
												</Text>
											</Text>
										</Stack>
									</Paper>
								</Group>
							</Stack>
						</Paper>
					</Grid.Col>
				</Grid>
			</Stack>
		</Paper>
	)
}
export default Statistic
