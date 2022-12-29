import { useState } from 'react'
import TestRecordList from '@/components/Record/TestRecordList'
import { useGetCheckupRecordByIdQuery } from '@/store/record/api'
import { formatDate } from '@/utils/formats'
import { Paper, Stack, Divider, Text, Tabs } from '@mantine/core'
import { useParams } from 'react-router-dom'
import PatientInfo from './PatientInfo'
import HistoryRecord from './HistoryRecord'
import MedicationList from './MedicationList'

const RecordHistory = () => {
	const [activeTab, setActiveTab] = useState<string | null>('record')
	const { id: recordId } = useParams()
	const { data: recordData, isLoading } = useGetCheckupRecordByIdQuery(
		{ id: Number(recordId) },
		{
			skip: !recordId,
		}
	)

	return (
		<Stack>
			<Paper p="md">
				<Tabs value={activeTab} onTabChange={setActiveTab}>
					<Tabs.List grow>
						<Tabs.Tab value="record">Thông tin chi tiết</Tabs.Tab>
						{/* <Tabs.Tab value="reExamTree">Chuỗi khám</Tabs.Tab> */}
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

							<Divider />
							<TestRecordList data={recordData?.testRecords} />
							<Divider />
							<MedicationList data={recordData?.prescription} />
						</Stack>
					</Tabs.Panel>
				</Tabs>
			</Paper>
		</Stack>
	)
}
export default RecordHistory
