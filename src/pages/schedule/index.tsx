import { Stack, Center, Input, Text, Paper } from '@mantine/core'
import { useForm } from '@mantine/form'
import dayjs from 'dayjs'
import vi from 'dayjs/locale/vi'
import weekOfYear from 'dayjs/plugin/weekOfYear'
dayjs.extend(weekOfYear)

dayjs.locale({
	...vi,
	weekStart: 1,
})
const ImportSchedule = () => {
	const isWeekends = dayjs().day() === 0 || dayjs().day() === 6
	// console.log(
	// 	'form.values.week',
	// 	dayjs().week(8).startOf('week').add(1, 'day').toISOString()
	// 	// dayjs().week(8).endOf('week').toISOString()
	// )
	const curWeek = dayjs().local().week() + 1
	const curYear = dayjs().local().year()
	const minWeek = `${curYear}-W${curWeek < 10 ? `0${curWeek}` : curWeek}`

	const splitYearWeek = (date: string) => date.split('-')
	const form = useForm({
		validateInputOnChange: true,
		initialValues: {
			week: '',
		},

		validate: {
			week: (value) => {
				console.log('isWeekends', splitYearWeek(value)[1].substring(1))
				if (isWeekends) {
					console.log(
						'Number(splitYearWeek(value)[1]) - 1 === dayjs().week()',
						Number(splitYearWeek(value)[1].substring(1)) - 1 === dayjs().week()
					)
					return Number(splitYearWeek(value)[1].substring(1)) - 1 ===
						dayjs().week()
						? 'error'
						: null
				}
				return null
			},
		},
	})

	console.log('form.errors', form.errors)

	return (
		<Paper p="md" sx={{ minHeight: 500, backgroundColor: 'white' }}>
			<Center py="lg">
				<Stack>
					<Stack>
						<Text>Chọn lịch khám</Text>

						<Input
							type="week"
							min={minWeek}
							invalid={form.errors.week}
							{...form.getInputProps('week')}
						/>
					</Stack>
				</Stack>
			</Center>
		</Paper>
	)
}
export default ImportSchedule
