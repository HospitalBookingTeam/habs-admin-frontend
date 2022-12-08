import { CheckupRecord } from '@/entities/record'
import { Room } from '@/entities/room'
import {
	CheckupRecordStatus,
	translateCheckupRecordStatus,
} from '@/utils/enums'

export const sortData = (
	data: CheckupRecord[],
	payload: {
		sortBy: keyof CheckupRecord | null
		reversed: boolean
		search: string
	}
) => {
	const { sortBy } = payload

	if (!sortBy) {
		return data
	}

	return [...data].sort((a, b) => {
		if (typeof a[sortBy] === 'number' && typeof b[sortBy] === 'number') {
			const num_sort_a = a[sortBy] as number
			const num_sort_b = b[sortBy] as number

			if (payload.reversed) {
				return num_sort_a - num_sort_b
			}

			return num_sort_b - num_sort_a
		}
		const _a = a[sortBy].toString()
		const _b = b[sortBy].toString()

		if (payload.reversed) {
			return _b.localeCompare(_a)
		}
		return _a.localeCompare(_b)
	})
}

export const statusToExludeList = [
	{
		label: translateCheckupRecordStatus(CheckupRecordStatus.CHO_TAI_KHAM),
		value: CheckupRecordStatus.CHO_TAI_KHAM.toString(),
	},
	{
		label: translateCheckupRecordStatus(CheckupRecordStatus.DA_HUY),
		value: CheckupRecordStatus.DA_HUY.toString(),
	},
	{
		label: translateCheckupRecordStatus(CheckupRecordStatus.DA_XOA),
		value: CheckupRecordStatus.DA_XOA.toString(),
	},
]

export const statusToExludeListDefaultValues = statusToExludeList.map(
	(item) => item.value
)

export const statusToIncludeList = Object.keys(CheckupRecordStatus)
	.filter(
		(val) =>
			!statusToExludeListDefaultValues.includes(val as string) &&
			!isNaN(Number(val))
	)
	.map((value) => ({
		label: translateCheckupRecordStatus(Number(value)),
		value: value.toString(),
	}))

export const formatRoomOptions = (roomData?: Room[]) =>
	roomData?.map((item) => ({
		...item,
		value: item.id.toString(),
		label: `${item.roomTypeName} ${item.departmentName?.toLowerCase()} ${
			item.roomNumber
		} - Tầng ${item.floor}`,
	})) ?? []
