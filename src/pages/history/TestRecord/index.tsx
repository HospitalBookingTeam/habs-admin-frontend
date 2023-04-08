import { Stack, Box, Paper, Group, Divider, Title } from '@mantine/core'

import { useParams } from 'react-router-dom'

import { useGetTestRecordByIdQuery } from '@/store/record/api'
import PatientInfo from './PatientInfo'
import TestRecordItem from '@/components/Record/TestRecordItem'
import { TestRecordStatus } from '@/utils/enums'

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
				<Paper p="md" sx={{ backgroundColor: 'white' }}>
					<Stack>
						<Group mt="sm">
							<Title order={3} size="h4">
								{data?.operationName ?? '---'}
							</Title>
						</Group>
						<Divider />
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
