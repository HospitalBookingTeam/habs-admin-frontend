import RowWithLabel from '@/components/Row'
import { ReExamCheckup } from '@/entities/history'
import { formatDate } from '@/utils/formats'
import { Stack, Text } from '@mantine/core'

const ReExamNote = ({ date, note, operations }: ReExamCheckup) => {
	return (
		<Stack>
			<Text weight={'bold'}>Thông tin tái khám</Text>
			<RowWithLabel
				label="Thời gian"
				content={date ? formatDate(date, 'DD/MM/YYYY') : '---'}
			/>
			<RowWithLabel
				label="Yêu cầu xét nghiệm trước"
				content={operations?.map((item) => item.operationName)?.join(', ')}
				isOdd
			/>
			<RowWithLabel label="Lưu ý" content={note ?? '---'} />
		</Stack>
	)
}
export default ReExamNote
