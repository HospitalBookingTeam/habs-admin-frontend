import { Stack, Box, Paper, Group, Divider, Title, Button } from '@mantine/core'

import { useParams } from 'react-router-dom'

import { useGetTestRecordByIdQuery } from '@/store/record/api'
import PatientInfo from './PatientInfo'
import TestRecordItem from '@/components/Record/TestRecordItem'
import { TestRecordStatus } from '@/utils/enums'
import { IconExternalLink } from '@tabler/icons'

const FinishQueueDetail = () => {
	const { id } = useParams()
	const { data } = useGetTestRecordByIdQuery(
		{ id: Number(id) },
		{
			skip: !id,
		}
	)

	return (
		<Stack align={'start'}>
			<Box sx={{ width: '100%' }}>
				<Group position="apart">
					<Title order={3} mb="md">
						Kết quả xét nghiệm
					</Title>
					<Button
						component="a"
						variant="white"
						target="_blank"
						href={`/records/${data?.checkupRecordId}`}
						rightIcon={<IconExternalLink />}
					>
						Xem bệnh án gốc
					</Button>
				</Group>
				<Paper p="md" sx={{ backgroundColor: 'white' }}>
					<Stack>
						<PatientInfo data={data} />
						<Divider />
						<TestRecordItem data={data} />
					</Stack>
				</Paper>
			</Box>
		</Stack>
	)
}
export default FinishQueueDetail
