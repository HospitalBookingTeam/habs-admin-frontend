import { useEffect, useState } from 'react'
import {
	Table,
	ScrollArea,
	Center,
	Pagination,
	Group,
	Stack,
	Box,
	Text,
	ActionIcon,
	useMantineTheme,
} from '@mantine/core'
import { pageSize } from './items'
import {
	formatRoomOptions,
	sortData,
	statusToExludeListDefaultValues,
	statusToIncludeList,
} from './utils'
import {
	Th,
	CustomSelect,
	CustomDateRangePicker,
	Search,
	CustomMultiSelect,
} from './components'
import { useDebouncedState } from '@mantine/hooks'
import {
	useGetCheckupRecordsQuery,
	useGetRoomListQuery,
} from '@/store/record/api'
import { CheckupRecord } from '@/entities/record'
import { translateCheckupRecordStatus } from '@/utils/enums'
import { formatDate, formatUTCDate } from '@/utils/formats'
import { IconChevronRight } from '@tabler/icons'

const PatientManage = () => {
	const theme = useMantineTheme()
	const [search, setSearch] = useDebouncedState('', 200)
	const [sortedData, setSortedData] = useState<CheckupRecord[] | null>(null)
	const [sortBy, setSortBy] = useState<keyof CheckupRecord | null>(null)
	const [reverseSortDirection, setReverseSortDirection] = useState(false)
	const [statusToExclude, setStatusToExclude] = useState<string[]>(
		statusToExludeListDefaultValues
	)
	const [statusToInclude, setStatusToInclude] = useState<string[] | null>(null)
	const [totalPageSize, setTotalPageSize] = useState<string | null>(pageSize[0])
	const [page, setPage] = useState(1)

	const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
		new Date(),
		new Date(),
	])
	const [roomsFilter, setRoomsFilter] = useState<string[] | null>(null)

	const { data: roomList } = useGetRoomListQuery()
	const { data, isLoading, isSuccess } = useGetCheckupRecordsQuery(
		{
			searchTerm: search,
			pageIndex: page,
			pageSize: Number(totalPageSize),
			statusToExclude: statusToExclude?.map((item) => Number(item)),
			statusToInclude: statusToInclude?.map((item) => Number(item)),
			from: dateRange[0]
				? formatUTCDate(dateRange[0].toString(), true)
				: undefined,
			to: dateRange[1]
				? formatUTCDate(dateRange[1].toString(), false, true)
				: undefined,
			roomIds: roomsFilter?.map((item) => Number(item)) ?? undefined,
		},
		{
			refetchOnFocus: true,
		}
	)

	const setSorting = (field: keyof CheckupRecord) => {
		if (!data) return
		const reversed = field === sortBy ? !reverseSortDirection : false
		setReverseSortDirection(reversed)
		setSortBy(field)
		setSortedData(sortData(data.data, { sortBy: field, reversed, search }))
	}

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.currentTarget
		setSearch(value)
	}

	useEffect(() => {
		if (isSuccess) {
			setSortedData(data.data)
		}
	}, [isSuccess, data])

	const rows = sortedData?.map((row, index) => (
		<tr
			key={row.id}
			style={{
				background: index % 2 === 0 ? 'transparent' : theme.colors.gray[1],
			}}
		>
			<td>
				<Text align="center">{row.numericalOrder}</Text>
			</td>
			<td>
				<Text
					sx={{
						textOverflow: 'ellipsis',
						whiteSpace: 'nowrap',
						overflow: 'hidden',
					}}
				>
					{row.patientName}
				</Text>
			</td>
			<td>{row.doctorName}</td>
			<td>
				<Text
					sx={{
						textOverflow: 'ellipsis',
						whiteSpace: 'nowrap',
						overflow: 'hidden',
					}}
				>
					{translateCheckupRecordStatus(row.status)}
				</Text>
			</td>
			<td>
				<Text align="center">{row.isReExam ? 'Có' : 'Không'}</Text>
			</td>
			<td>
				<Text>{row?.date ? formatDate(row.date) : '---'}</Text>
			</td>
			<td>
				<ActionIcon
					variant="filled"
					color="green"
					component="a"
					href={`records/${row.id}`}
					target="_blank"
					rel="noopener noreferrer"
				>
					<IconChevronRight />
				</ActionIcon>
			</td>
		</tr>
	))

	return (
		<ScrollArea my="md">
			<Stack mb="md">
				<Group>
					<Search defaultValue={search} onChange={handleSearchChange} />
					<CustomDateRangePicker
						label="Thời gian khám"
						allowSingleDateInRange={true}
						value={dateRange}
						onChange={setDateRange}
					/>
				</Group>
				<Group>
					<Box sx={{ flex: 1 }}>
						<CustomMultiSelect
							data={formatRoomOptions(roomList)}
							value={roomsFilter ?? undefined}
							onChange={setRoomsFilter}
							label="Phòng khám"
							placeholder="Tất cả"
						/>
					</Box>
					<Box sx={{ flex: 1 }}>
						<CustomMultiSelect
							data={statusToIncludeList}
							value={statusToInclude ?? undefined}
							onChange={setStatusToInclude}
							label="Tình trạng lọc"
							placeholder="Tất cả"
						/>
					</Box>
					<CustomMultiSelect
						data={statusToIncludeList}
						value={statusToExclude}
						onChange={setStatusToExclude}
						label="Tình trạng không lọc"
					/>
				</Group>
			</Stack>
			<Table
				horizontalSpacing="md"
				verticalSpacing="xs"
				sx={{ tableLayout: 'fixed', minWidth: 700, minHeight: 300 }}
			>
				<thead>
					<tr>
						<Th
							sorted={sortBy === 'numericalOrder'}
							reversed={reverseSortDirection}
							onSort={() => setSorting('numericalOrder')}
							width={100}
						>
							SKB
						</Th>
						<Th
							sorted={sortBy === 'patientName'}
							reversed={reverseSortDirection}
							onSort={() => setSorting('patientName')}
						>
							Người bệnh
						</Th>
						<Th
							sorted={sortBy === 'doctorName'}
							reversed={reverseSortDirection}
							onSort={() => setSorting('doctorName')}
						>
							Bác sĩ
						</Th>
						<Th
							sorted={sortBy === 'status'}
							reversed={reverseSortDirection}
							onSort={() => setSorting('status')}
							width={170}
						>
							Tình trạng
						</Th>
						<Th
							sorted={sortBy === 'isReExam'}
							reversed={reverseSortDirection}
							onSort={() => setSorting('isReExam')}
							width={130}
						>
							Tái khám
						</Th>
						<Th
							sorted={sortBy === 'date'}
							reversed={reverseSortDirection}
							onSort={() => setSorting('date')}
							width={200}
						>
							Thời gian
						</Th>
						<th style={{ width: 50 }}></th>
					</tr>
				</thead>
				<tbody>
					{rows?.length && rows?.length > 0 ? (
						rows
					) : (
						<tr>
							<td colSpan={6}>
								<Center>
									<Text align="center">Không tìm thấy dữ liệu</Text>
								</Center>
							</td>
						</tr>
					)}
				</tbody>
			</Table>

			<Group
				position="center"
				sx={{ position: 'relative' }}
				align="center"
				mt={'md'}
				py="md"
			>
				<Pagination
					total={data?.totalPage ?? 0}
					page={page}
					onChange={setPage}
					withEdges={true}
				/>
				<Box sx={{ position: 'absolute', top: '0', right: 0 }}>
					<CustomSelect
						// style={{ marginTop: 20, zIndex: 2 }}
						data={pageSize}
						placeholder="mặc định 5"
						value={totalPageSize}
						onChange={setTotalPageSize}
						label="Số hàng"
						dropdownPosition="top"
					/>
				</Box>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: 0,
						transform: 'translateY(-50%)',
					}}
				>
					<Text size="sm">{data?.totalItem ?? 0} kết quả</Text>
				</Box>
			</Group>
		</ScrollArea>
	)
}

export default PatientManage

// TO-DO: add responsive
