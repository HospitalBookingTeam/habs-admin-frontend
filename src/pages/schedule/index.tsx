import DropzoneButton from '@/components/Dropzone'
import {
	Stack,
	Center,
	Input,
	Title,
	Paper,
	Divider,
	Group,
	Button,
} from '@mantine/core'
import { useState } from 'react'
import { useForm } from '@mantine/form'
import dayjs from 'dayjs'
import vi from 'dayjs/locale/vi'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import {
	useLazyDownloadScheduleQuery,
	useUpdateScheduleMutation,
} from '@/store/configs/api'
import {
	getCurrentWeek,
	readExcelFile,
	splitYearWeek,
	weekToISOString,
} from './utils'
import { showNotification } from '@mantine/notifications'
dayjs.extend(weekOfYear)
dayjs.locale({
	...vi,
})
const ImportSchedule = () => {
	const isWeekends = dayjs().day() === 0 || dayjs().day() === 6

	const curWeek = Number(splitYearWeek(getCurrentWeek())?.[1]?.substring(1))
	console.log('curWeek', curWeek)
	const curYear = dayjs().local().year()
	const minWeek = `${curYear}-W${curWeek < 10 ? `0${curWeek}` : curWeek}`
	const [downloadDate, setDownloadDate] = useState<any>(getCurrentWeek())
	const [triggerDownloadDate, { isLoading: isLoadingDownloadDate }] =
		useLazyDownloadScheduleQuery()
	const [updateScheduleMutation, { isLoading: isLoadingUpdateMutation }] =
		useUpdateScheduleMutation()

	const form = useForm({
		validateInputOnChange: true,
		initialValues: {
			week: '',
			file: null,
		},
		validate: {
			week: (value) => {
				if (isWeekends) {
					return Number(splitYearWeek(value)?.[1]?.substring(1)) - 1 ===
						dayjs().startOf('week').week()
						? 'error'
						: null
				}
				return null
			},
			file: (value) => {
				return !value ? 'error' : null
			},
		},
	})

	const onSubmit = async (values: { file: FileList | null; week: string }) => {
		const _file = values?.file?.[0]
		if (!_file) return
		const reader = new FileReader()

		reader.onload = async (event) => {
			const data = event.target?.result

			const result = await readExcelFile(data)
			await updateScheduleMutation({
				startDate: weekToISOString(values.week),
				data: result,
			})
				.unwrap()
				.then(() => {
					showNotification({
						title: 'Thành công',
						message: 'Cập nhật lịch thành công',
					})
				})
		}

		reader.readAsBinaryString(_file)
	}

	return (
		<Paper p="md" sx={{ minHeight: 500, backgroundColor: 'white' }}>
			<Center py="lg">
				<Stack>
					<Stack>
						<Title order={4}>Chọn lịch khám</Title>

						<Group position="apart">
							<Input
								type="week"
								value={downloadDate}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
									setDownloadDate(event.target.value)
								}
							/>
							<Button
								loading={isLoadingDownloadDate}
								onClick={async () => {
									const yearAndWeek = downloadDate.split('-W')
									const year = Number(yearAndWeek[0])
									const weekNumber = Number(yearAndWeek[1])
									const date = new Date(year, 0, (weekNumber - 1) * 7)
									const isoString = date.toISOString()

									triggerDownloadDate({ startDate: isoString })
								}}
							>
								Tải về
							</Button>
						</Group>
					</Stack>
					<Divider />
					<form onSubmit={form.onSubmit(onSubmit)}>
						<Stack>
							<Title order={4}>Cập nhật lịch khám</Title>

							<Input
								type="week"
								min={minWeek}
								invalid={form.errors.week}
								{...form.getInputProps('week')}
							/>

							<DropzoneButton {...form.getInputProps('file')} />

							<Button
								type="submit"
								disabled={!form.isValid()}
								mt="xl"
								loading={isLoadingUpdateMutation}
							>
								Cập nhật
							</Button>
						</Stack>
					</form>
				</Stack>
			</Center>
		</Paper>
	)
}
export default ImportSchedule
