import RowWithLabel from '@/components/Row'
import { HistoryCheckupRecord } from '@/entities/history'
import { Stack, Title, Grid } from '@mantine/core'

const HistoryRecord = ({ data }: { data?: HistoryCheckupRecord }) => {
	return (
		<Stack>
			<Title order={3} size="h4">
				Thông tin khám bệnh
			</Title>

			<Stack>
				<RowWithLabel
					label="Tình trạng"
					content={data?.isReExam ? 'Tái khám' : 'Khám thường'}
				/>
				<RowWithLabel label="Khoa" content={data?.departmentName} isOdd />
				<RowWithLabel label="Bác sĩ" content={data?.doctorName} />

				<Grid>
					<Grid.Col span={3}>
						<RowWithLabel
							labelSpan={7}
							label="Nhịp tim (BPM)"
							content={data?.pulse?.toString() ?? '---'}
							isOdd
						/>
					</Grid.Col>
					<Grid.Col span={3}>
						<RowWithLabel
							labelSpan={7}
							label="Huyết áp (mmHg)"
							content={data?.bloodPressure?.toString() ?? '---'}
							isOdd
						/>
					</Grid.Col>
					<Grid.Col span={3}>
						<RowWithLabel
							labelSpan={7}
							label="Nhiệt độ (°C)"
							content={data?.temperature?.toString() ?? '---'}
							isOdd
						/>
					</Grid.Col>
				</Grid>
				<RowWithLabel
					labelSpan={3}
					label="Chẩn đoán cận lâm sàng"
					content={data?.diagnosis?.toString() ?? '---'}
				/>
				<RowWithLabel
					labelSpan={3}
					label="Lời khuyên bác sĩ"
					content={data?.doctorAdvice?.toString() ?? '---'}
					isOdd
				/>
			</Stack>
		</Stack>
	)
}
export default HistoryRecord
