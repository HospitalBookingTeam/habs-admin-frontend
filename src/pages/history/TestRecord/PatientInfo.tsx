import RowWithLabel from '@/components/Row'
import { HistoryTestRecord } from '@/entities/history'
// import { formatDate } from '@/utils/formats'
import { Stack, Title } from '@mantine/core'

const PatientInfo = ({ data }: { data?: HistoryTestRecord }) => {
	return (
		<Stack>
			<Title order={3} px="0" size="h4">
				Thông tin người bệnh
			</Title>
			<Stack sx={{ gap: 12 }}>
				<RowWithLabel label={'Họ và tên'} content={data?.patientName} />
				{/* <RowWithLabel
					label={'Ngày sinh'}
					content={data?.dateOfBirth ? formatDate(data.dateOfBirth) : '---'}
				/> */}
				{/* <RowWithLabel label={'SĐT'} content={data?.phoneNumber} />
				<RowWithLabel
					label={'Giới tính'}
					content={data?.gender === 0 ? 'Nam' : 'Nữ'}
				/>
				<RowWithLabel label={'BHYT'} content={data?.bhyt} /> */}
			</Stack>
		</Stack>
	)
}

export default PatientInfo
