import { Schedule } from '@/entities/schedule'
import dayjs from 'dayjs'
import * as XLSX from 'xlsx'

export const readExcelFile = async (file: any): Promise<Schedule[]> => {
	const workbook = XLSX.read(file, { type: 'binary' })
	const sheetName = workbook.SheetNames[0]
	console.log('workbook', workbook)
	const worksheet = workbook.Sheets[sheetName]
	const json = XLSX.utils.sheet_to_json(worksheet)
	return json as Schedule[]
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

export const splitYearWeek = (date: string) => date.split('-W')
export function weekToISOString(week: string): string {
	// Parse the week input as a number
	const weekNumber = Number(splitYearWeek(week)?.[1]?.substring(1))

	// Check if the input is a valid week number (between 1 and 53)
	if (isNaN(weekNumber) || weekNumber < 1 || weekNumber > 53) {
		throw new Error('Invalid week number')
	}

	// Get the start of the week as a dayjs object
	const weekStart = dayjs().week(weekNumber).startOf('week')

	// Format the week start as an ISO string
	return weekStart.toISOString()
}

export function getDateOfISOWeek(week: string) {
	const [y, w]: string[] = splitYearWeek(week)
	var simple = new Date(Number(y), 0, 1 + (Number(w) - 1) * 7)
	var dow = simple.getDay()
	var ISOweekStart = simple
	if (dow <= 4) ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1)
	else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay())
	return ISOweekStart.toISOString()
}
