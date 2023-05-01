import RowWithLabel from '@/components/Row'
import { Patient } from '@/entities/history'
import { formatDate } from '@/utils/formats'
import { Group, Stack, Title } from '@mantine/core'

const PatientInfo = ({ data }: { data?: Patient }) => {
	return (
		<Stack>
			<Title order={3} px="0" size="h4">
				Thông tin người bệnh
			</Title>
			<Stack sx={{ gap: 12 }}>
				<Group spacing={0}>
					<RowWithLabel
						label={'Họ và tên'}
						labelSpan={6}
						content={data?.name}
						fullWidth={false}
					/>
					<RowWithLabel
						label={'Ngày sinh'}
						content={
							data?.dateOfBirth
								? formatDate(data.dateOfBirth, 'DD/MM/YYYY')
								: '---'
						}
						fullWidth={false}
					/>
				</Group>
				<Group spacing={0}>
					<RowWithLabel
						label={'SĐT'}
						labelSpan={6}
						content={data?.phoneNumber}
						fullWidth={false}
						isOdd
					/>
					<RowWithLabel
						label={'Giới tính'}
						content={data?.gender === 0 ? 'Nam' : 'Nữ'}
						fullWidth={false}
						isOdd
					/>
				</Group>
				<RowWithLabel label={'BHYT'} content={data?.bhyt} />
			</Stack>
		</Stack>
	)
}

export default PatientInfo
