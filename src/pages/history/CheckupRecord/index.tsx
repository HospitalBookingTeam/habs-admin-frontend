import { useState } from 'react'
import TestRecordList from '@/components/Record/TestRecordList'
import {
	useGetCheckupRecordByIdQuery,
	useGetReExamTreeQuery,
} from '@/store/record/api'
import { formatDate } from '@/utils/formats'
import {
	Paper,
	Stack,
	Divider,
	Text,
	Tabs,
	Title,
	LoadingOverlay,
} from '@mantine/core'
import { useParams } from 'react-router-dom'
import PatientInfo from './PatientInfo'
import HistoryRecord from './HistoryRecord'
import MedicationList from './MedicationList'
import PatientRecordTree from '@/components/Record/PatientRecordTree'

const RecordHistory = () => {
	const [activeTab, setActiveTab] = useState<string | null>('record')
	const { id: recordId } = useParams()
	const { data: recordData, isLoading } = useGetCheckupRecordByIdQuery(
		{ id: Number(recordId) },
		{
			skip: !recordId,
		}
	)

	const { data: reExamTree, isLoading: isLoadingReExamTree } =
		useGetReExamTreeQuery(recordData?.id?.toString() as string, {
			skip: !recordData?.id || activeTab !== 'reExamTree',
		})

	return (
		<Stack>
			<Title order={3}>Kết quả khám bệnh</Title>
			<Paper p="md" sx={{ backgroundColor: 'white' }}>
				<Tabs value={activeTab} onTabChange={setActiveTab}>
					<Tabs.List grow>
						<Tabs.Tab value="record">Thông tin chi tiết</Tabs.Tab>
						<Tabs.Tab value="reExamTree">Chuỗi khám</Tabs.Tab>
					</Tabs.List>
					<Tabs.Panel value="record" pt="xs">
						<Stack>
							<Text>
								Thời gian:{' '}
								<Text span color="green" weight={500}>
									{recordData?.date ? formatDate(recordData.date) : '---'}
								</Text>
							</Text>
							<Divider />
							<PatientInfo data={recordData?.patientData} />
							<Divider />
							<HistoryRecord data={recordData} />

							{recordData?.testRecords?.length ? (
								<>
									<Divider />
									<TestRecordList data={recordData?.testRecords} />
								</>
							) : (
								<></>
							)}
							{recordData?.prescription ? (
								<>
									<Divider />
									<MedicationList data={recordData?.prescription} />
								</>
							) : (
								<></>
							)}
						</Stack>
					</Tabs.Panel>
					<Tabs.Panel value="reExamTree" pt="xs" sx={{ position: 'relative' }}>
						<LoadingOverlay visible={isLoading || isLoadingReExamTree} />
						<Stack sx={{ minHeight: 200 }}>
							<PatientRecordTree data={reExamTree} />
						</Stack>
					</Tabs.Panel>
				</Tabs>
			</Paper>
		</Stack>
	)
}
export default RecordHistory
