import { formatDate } from '@/utils/formats'
import dayjs from 'dayjs'
import * as XLSX from 'xlsx'

export const getHeaderFromColumn = (column: string): keyof Schedule => {
	switch (column) {
		case 'A':
			return 'Bác sĩ'
		case 'B':
			return 'Sáng CN'
		case 'C':
			return 'Chiều CN'
		case 'D':
			return 'Tối CN'
		case 'E':
			return 'Sáng T2'
		case 'F':
			return 'Chiều T2'
		case 'G':
			return 'Tối T2'
		case 'H':
			return 'Sáng T3'
		case 'I':
			return 'Chiều T3'
		case 'J':
			return 'Tối T3'
		case 'K':
			return 'Sáng T4'
		case 'L':
			return 'Chiều T4'
		case 'M':
			return 'Tối T4'
		case 'N':
			return 'Sáng T5'
		case 'O':
			return 'Chiều T5'
		case 'P':
			return 'Tối T5'
		case 'Q':
			return 'Sáng T6'
		case 'R':
			return 'Chiều T6'
		case 'S':
			return 'Tối T6'
		case 'T':
			return 'Sáng T7'
		case 'U':
			return 'Chiều T7'
		case 'V':
			return 'Tối T7'
		default:
			throw new Error(`Invalid column: ${column}`)
	}
}

export const readExcelFile = async (file: any): Promise<Schedule[]> => {
	const workbook = XLSX.read(file, { type: 'binary' })
	const sheetName = workbook.SheetNames[0]
	const worksheet = workbook.Sheets[sheetName]
	const range = XLSX.utils.decode_range(worksheet?.['!ref'] || '')
	const schedule: Schedule[] = []

	for (let row = range.s.r + 1; row <= range.e.r; row++) {
		const newSchedule: Schedule = { 'Bác sĩ': 0 }

		for (let col = range.s.c; col <= range.e.c; col++) {
			const cellAddress = XLSX.utils.encode_cell({ r: row, c: col })
			const cellValue = worksheet[cellAddress]?.v
			const header = getHeaderFromColumn(XLSX.utils.encode_col(col))

			if (header !== undefined) {
				newSchedule[header] = cellValue ? parseInt(cellValue) : undefined
			}
		}

		schedule.push(newSchedule)
	}

	return schedule
}

export function getCurrentWeek(): string {
	const currentDate: Date = new Date()
	const yearStart: Date = new Date(currentDate.getFullYear(), 0, 1)
	const firstDayOfYear: number = yearStart.getDay()
	const daysOffset: number = (firstDayOfYear > 0 ? 7 - firstDayOfYear : 0) + 1
	const yearStartAdjusted: Date = new Date(
		currentDate.getFullYear(),
		0,
		daysOffset
	)
	const weekNumber: number =
		Math.floor(
			(currentDate.getTime() - yearStartAdjusted.getTime()) /
				(7 * 24 * 60 * 60 * 1000)
		) + 1
	const year: number = currentDate.getFullYear()
	return `${year}-W${weekNumber.toString().padStart(2, '0')}`
}

export const splitYearWeek = (date: string) => date.split('-')
export function weekToISOString(week: string): string {
	// Parse the week input as a number
	const weekNumber = Number(splitYearWeek(week)?.[1]?.substring(1))
	console.log('weekNumber', weekNumber)
	// Check if the input is a valid week number (between 1 and 53)
	if (isNaN(weekNumber) || weekNumber < 1 || weekNumber > 53) {
		throw new Error('Invalid week number')
	}

	// Get the start of the week as a dayjs object
	const weekStart = dayjs().week(weekNumber).startOf('week')

	// Format the week start as an ISO string
	return weekStart.toISOString()
}
