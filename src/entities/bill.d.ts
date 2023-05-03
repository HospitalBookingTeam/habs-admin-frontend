export interface BillDetail {
	id: number
	price: number
	quantity: number
	subTotal: number
	insuranceStatus: number
	operationId: number
	operationName: string
}

export interface Bill {
	id: number
	timeCreated: string
	total: number
	totalInWord: string
	status: number
	content: string
	patientName: string
	phoneNo?: any
	accountPhoneNo?: any
	patientId: number
	gender: number
	dateOfBirth: string
	qrCode?: any
	cashierName: string
	cashierId: number
	details?: BillDetail[]
	title?: string
	code: string
	payDate: string
}

export interface PatientData {
	id: number
	phoneNumber: string
	name: string
	gender: number
	dateOfBirth: string
	address?: any
	provinceId?: any
	districtId?: any
	wardId?: any
	fullAddress: string
	bhyt: string
	accountPhoneNo?: any
	accountId?: any
}
