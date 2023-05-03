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
	Box,
	Group,
	Button,
} from '@mantine/core'
import { useParams } from 'react-router-dom'
import PatientInfo from './PatientInfo'
import HistoryRecord from './HistoryRecord'
import MedicationList from './MedicationList'
import PatientRecordTree from '@/components/Record/PatientRecordTree'
import ReExamNote from './ReExamNote'
import { openModal } from '@mantine/modals'
import Bills from './Bill'
import PrintDetail from './PrintDetail'

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
		useGetReExamTreeQuery(recordData?.reExamTreeCode?.toString() as string, {
			skip: !recordData?.reExamTreeCode || activeTab !== 'reExamTree',
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
							<Group position="apart">
								<Stack spacing={'xs'}>
									<Text>
										Thời gian dự kiến:{' '}
										<Text span color="dimmed" weight={'bolder'}>
											{recordData?.estimatedStartTime
												? formatDate(recordData.estimatedStartTime)
												: '---'}
										</Text>
									</Text>
									<Text>
										Thời gian checkin:{' '}
										<Text span color="green" weight={'bolder'}>
											{recordData?.checkinTime
												? formatDate(recordData.checkinTime)
												: '---'}
										</Text>
									</Text>
								</Stack>
							</Group>

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
							{recordData?.reExam ? (
								<>
									<Divider />
									<ReExamNote {...recordData?.reExam} />
								</>
							) : (
								<></>
							)}

							<Group>
								{!!recordData?.bill?.length && (
									<Box>
										<Button
											variant="outline"
											onClick={() => {
												openModal({
													title: 'Chi tiết hóa đơn',
													children: <Bills data={recordData.bill} />,
													centered: true,
													size: 'lg',
												})
											}}
										>
											Tra cứu hóa đơn
										</Button>
									</Box>
								)}
								<Box sx={{ maxWidth: 150 }}>
									{!!recordData && <PrintDetail data={recordData} />}
								</Box>
							</Group>
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
