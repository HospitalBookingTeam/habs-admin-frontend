export type Schedule = {
	'Mã BS'?: number
	'Tên BS'?: string
	'Sáng T2'?: number
	'Chiều T2'?: number
	'Tối T2'?: number
	'Sáng T3'?: number
	'Chiều T3'?: number
	'Tối T3'?: number
	'Sáng T4'?: number
	'Chiều T4'?: number
	'Tối T4'?: number
	'Sáng T5'?: number
	'Chiều T5'?: number
	'Tối T5'?: number
	'Sáng T6'?: number
	'Chiều T6'?: number
	'Tối T6'?: number
	'Sáng T7'?: number
	'Chiều T7'?: number
	'Tối T7'?: number
	'Sáng CN'?: number
	'Chiều CN'?: number
	'Tối CN'?: number
}

export interface IScheduleDoctor {
	id: number
	name: string
	department: string
	departmentId: number
}

export interface IScheduleSlot {
	estimatedStartTime: string
	patientName?: any
	isAvailable: boolean
	isFinished: boolean
}

export interface IScheduleSlotOfDoctor {
	session: number
	roomNumber: string
	floor: string
	slots: IScheduleSlot[]
}
