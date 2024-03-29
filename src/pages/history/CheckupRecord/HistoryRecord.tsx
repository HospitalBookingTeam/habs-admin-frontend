import RowWithLabel from '@/components/Row'
import { HistoryCheckupRecord } from '@/entities/history'
import { translateCheckupRecordStatus } from '@/utils/enums'
import { Stack, Title, Grid, Group } from '@mantine/core'

const HistoryRecord = ({ data }: { data?: HistoryCheckupRecord }) => {
	return (
		<Stack>
			<Title order={3} size="h4">
				Thông tin khám bệnh
			</Title>

			<Stack>
				<RowWithLabel label="Mã số" content={data?.code ?? '---'} />
				<Group spacing={0}>
					<RowWithLabel
						label="Bác sĩ"
						labelSpan={6}
						content={data?.doctorName}
						isOdd
					/>
					<RowWithLabel label="Khoa" content={data?.departmentName} isOdd />
				</Group>
				<RowWithLabel
					label="Tình trạng"
					content={
						data?.status ? translateCheckupRecordStatus(data?.status) : '---'
					}
				/>
				<RowWithLabel
					label="Phòng"
					content={`Phòng khám ${data?.roomNumber ?? '--'} tầng ${
						data?.floor ?? '--'
					}`}
					isOdd
				/>
				<RowWithLabel label="Triệu chứng" content={data?.clinicalSymptom} />
				<RowWithLabel
					label="Chẩn đoán"
					content={
						data?.icdDiseases?.map((item) => item.icdDiseaseName)?.join(', ') ||
						'---'
					}
					isOdd
				/>

				<Grid>
					<Grid.Col span={3}>
						<RowWithLabel
							labelSpan={7}
							label="Chiều cao (cm)"
							content={data?.bloodPressure?.toString() ?? '---'}
						/>
					</Grid.Col>
					<Grid.Col span={3}>
						<RowWithLabel
							labelSpan={7}
							label="Cân nặng (kg)"
							content={data?.pulse?.toString() ?? '---'}
						/>
					</Grid.Col>
					<Grid.Col span={3}>
						<RowWithLabel
							labelSpan={7}
							label="Nhiệt độ (°C)"
							content={data?.temperature?.toString() ?? '---'}
						/>
					</Grid.Col>
				</Grid>
				<RowWithLabel
					labelSpan={3}
					label="Chẩn đoán cận lâm sàng"
					content={data?.diagnosis?.toString() || '---'}
					isOdd
				/>
				<RowWithLabel
					labelSpan={3}
					label="Lời khuyên bác sĩ"
					content={data?.doctorAdvice?.toString() || '---'}
				/>
			</Stack>
		</Stack>
	)
}
export default HistoryRecord
