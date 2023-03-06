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
} from '@mantine/core'

const Statistic = () => {
	const { data, isLoading } = useGetStatisticsQuery({})

	const dataForCheckup = [
		{
			value: data?.checkedInCount,
			label: 'Số người checkin',
			color: 'green',
		},
		{
			value: data?.inProgressCount,
			label: 'Số người đang trong quá trình khám',
			color: 'cyan',
		},
		{
			value: data?.checkedInAfterTestsCount,
			label: 'Số người checkin sau xét nghiệm',
			color: 'yellow',
		},
		{
			value: data?.finishedCount,
			label: 'Số người hoàn thành khám bệnh',
			color: 'blue',
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

	const bookViaAppVsAnonymous = Math.round(
		((data?.bookedAndPaidCount ?? 0) /
			((data?.bookedAndPaidCount ?? 0) + (data?.annonymousCount ?? 0) ?? 1)) *
			100
	)

	return (
		<Paper sx={{ background: 'transparent' }}>
			<Stack sx={{ minHeight: 'calc(100vh - 100px)' }}>
				<Grid grow align="stretch">
					<Grid.Col span={8} sx={{ minHeight: 250 }}>
						<Paper p="sm" sx={{ backgroundColor: 'white', height: '100%' }}>
							<Stack spacing={'xs'}>
								<Text size="lg" weight="bolder">
									Thống kê lượng người khám bệnh
								</Text>
								<Divider />
							</Stack>
							<Table verticalSpacing="sm" striped fontSize="md">
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
					<Grid.Col span={4} sx={{ minHeight: 250 }}>
						<Paper p="sm" sx={{ backgroundColor: 'white' }}>
							<Stack>
								<Stack spacing={'xs'}>
									<Text size="lg" weight="bolder">
										Thống kê lượng đăng ký khám
									</Text>
									<Divider />
								</Stack>
								<Stack px="md">
									<Center>
										<RingProgress
											label={
												<Stack align="center" spacing="xs">
													<Text size="xs">Tổng cộng</Text>
													<Text size="xl" weight="bold">
														{(data?.annonymousCount ?? 0) +
															(data?.bookedAndPaidCount ?? 0)}
													</Text>
												</Stack>
											}
											size={180}
											thickness={20}
											sections={[
												{ value: bookViaAppVsAnonymous, color: 'green' },
												{ value: 100 - bookViaAppVsAnonymous, color: 'orange' },
											]}
										/>
									</Center>
									<Stack sx={{ flex: 1 }}>
										<Group position="apart">
											<Box>
												<Badge variant="dot" size="lg">
													Đăng ký qua app ({data?.bookedAndPaidCount} người)
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
											<Text>{100 - bookViaAppVsAnonymous}%</Text>
										</Group>
									</Stack>
								</Stack>
							</Stack>
						</Paper>
					</Grid.Col>
					<Grid.Col span={12} sx={{ minHeight: 250 }}>
						<Paper p="sm" sx={{ backgroundColor: 'white', height: '100%' }}>
							<Stack spacing={'xs'}>
								<Text size="lg" weight="bolder">
									Thống kê lượng người xét nghiệm
								</Text>
								<Divider />

								<Group grow pt="sm">
									<Stack>
										<Text size="xl" weight="bolder">
											{data?.testRecords?.notPaidCount}{' '}
											<Text span size="sm" weight="normal">
												người chưa thanh toán
											</Text>
										</Text>
										<Text size="xl" weight="bolder">
											{data?.testRecords?.paidCount}{' '}
											<Text span size="sm" weight="normal">
												người đã thanh toán
											</Text>
										</Text>
									</Stack>
									<Stack>
										<Text size="xl" weight="bolder">
											{data?.testRecords?.checkedInCount}{' '}
											<Text span size="sm" weight="normal">
												người đã check in
											</Text>
										</Text>
										<Text size="xl" weight="bolder">
											{data?.testRecords?.testInProgressCount}{' '}
											<Text span size="sm" weight="normal">
												người đang xét nghiệm
											</Text>
										</Text>
									</Stack>
									<Stack>
										<Text size="xl" weight="bolder">
											{data?.testRecords?.resultFilledCount}{' '}
											<Text span size="sm" weight="normal">
												người đã có kết quả xét nghiệm
											</Text>
										</Text>
										<Text size="xl" weight="bolder">
											{data?.testRecords?.operationFinishedCount}{' '}
											<Text span size="sm" weight="normal">
												người đã hoàn thành xét nghiệm
											</Text>
										</Text>
									</Stack>
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
