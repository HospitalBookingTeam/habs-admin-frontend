import { Bill } from './bill'

export interface Patient {
	id: number
	phoneNumber: string
	name: string
	gender: number
	dateOfBirth: string
	address: string
	bhyt: string
}
export interface IcdDiseases {
	icdDiseaseId: number
	icdDiseaseName: string
	icdCode: string
}

export interface IOperationReExam {
	operationName: string
	id: number
}
export interface ReExamCheckup {
	date: string
	operations: IOperationReExam[]
	note: string
}

export interface Detail {
	id: number
	quantity: number
	usage: string
	unit: string
	morningDose: number
	middayDose: number
	eveningDose: number
	nightDose: number
	medicineName: string
	prescriptionId: number
	medicineId: number
}

export interface Prescription {
	id: number
	timeCreated: string
	note: string
	checkupRecordId: number
	details: Detail[]
	code?: string
}
export interface HistoryCheckupRecord {
	patientData: PatientData
	testRecords: any[]
	prescription?: Prescription
	id: number
	status: number
	numericalOrder: number
	estimatedStartTime: string
	estimatedDate: string
	date: string
	clinicalSymptom: string
	diagnosis?: any
	doctorAdvice?: any
	pulse?: any
	bloodPressure?: any
	temperature?: any
	doctorName: string
	patientName: string
	departmentName: string
	patientId: number
	doctorId: number
	departmentId: number
	icdDiseases?: IcdDiseases[]
	isReExam: boolean
	qrCode: string
	reExamTreeCode: string
	hasReExam: boolean
	reExamNote?: any
	address: string
	reExam?: ReExamCheckup
	roomNumber?: string
	floor?: string
	code?: string
	bill: Bill[]
	checkinTime: string
}

export interface HistoryTestRecord {
	id: number
	date: string
	numericalOrder: number
	status: number
	resultFileLink: string
	patientName: string
	operationId: number
	operationName: string
	roomNumber: string
	floor: string
	roomId: number
	patientId: number
	checkupRecordId: number
	doctorId: number
	doctorName: string
	qrCode: string
	resultDescription?: any
	failReason?: string
	code?: string
}
