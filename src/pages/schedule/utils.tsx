import { IScheduleDoctor } from '@/entities/schedule'

export type IResultValue = Array<{ name: string; id: number; depId: number }>
export type IResult = { department: string; value: IResultValue }[]

export const handleIScheduleResponse = (data: IScheduleDoctor[]): IResult => {
	const result: Map<string, IResultValue> = new Map()

	for (let i = 0; i < data.length; i++) {
		const doc = data[i]
		result.set(doc.department, [
			...(Array.from(result.get(doc.department) ?? []) as IResultValue),
			{ name: doc.name, id: doc.id, depId: doc.departmentId },
		])
	}
	return [...result].map(([department, value]) => ({ department, value }))
}
