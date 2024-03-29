import { Button, Stack, Group, Text, Divider, List } from '@mantine/core'
import { IconPrinter, IconTemperatureCelsius } from '@tabler/icons'
import { useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import { formatDate, renderDoseContent } from '@/utils/formats'
import Signature from '@/components/Signature'
import dayjs from 'dayjs'
import Barcode from 'react-barcode'

import { HistoryCheckupRecord } from '@/entities/history'

const DATE_FORMAT = 'DD/MM/YYYY, HH:mm'

const PrintDetail = ({ data }: { data: HistoryCheckupRecord }) => {
	const componentRef = useRef(null)
	const handlePrint = useReactToPrint({
		pageStyle: `@media print {
      @page {
        size: A5 portrait;
        margin: 0;
      }
    }`,
		content: () => componentRef.current,
	})

	const onHandlePrint = handlePrint
	return (
		<>
			<Button
				fullWidth={true}
				color="green"
				variant="outline"
				onClick={onHandlePrint}
				leftIcon={<IconPrinter />}
			>
				In bệnh án
			</Button>
			<Stack sx={{ overflow: 'hidden', height: 0 }}>
				<Stack ref={componentRef} p="xs">
					<Group pt="sm" position="apart" align="start">
						<Stack spacing={1} align="center">
							<Text size="xs">SỞ Y TẾ TP. Hồ Chí Minh</Text>
							<Text size="xs" weight="bold">
								BỆNH VIỆN NHI ĐỒNG 2
							</Text>
							<Divider variant="dotted" color="dark" size="sm" />
							<Text size={10} weight="bold">
								Khoa khám bệnh
							</Text>
							<Text size={10}>
								Phòng {data.roomNumber} - Tầng {data.floor}
							</Text>
						</Stack>
						<Text size="md" py="sm" weight="bold">
							KẾT QUẢ KHÁM BỆNH
						</Text>

						<Stack align="end" spacing={0}>
							<Barcode
								height={40}
								width={1}
								value={data?.code?.split('_')?.[1] ?? '---'}
								displayValue={false}
							/>
							<Text size={10}>Mã số: {data?.code}</Text>
						</Stack>
					</Group>

					<Stack spacing="xs" p="sm">
						<Group>
							<Text size="sm">Họ tên: {data?.patientData?.name}</Text>
							<Text size="sm">
								Ngày sinh:{' '}
								{data?.patientData?.dateOfBirth
									? formatDate(data?.patientData?.dateOfBirth)
									: '---'}
							</Text>
							<Text size="sm">
								Giới tính: {data?.patientData?.gender === 0 ? 'Nam' : 'Nữ'}
							</Text>
						</Group>

						<Text size="sm">SĐT: {data?.patientData?.phoneNumber}</Text>
						<Divider />
						<Text size="sm">Biểu hiện lâm sàng: {data?.diagnosis}</Text>
						<Group>
							<Text size="sm">
								Nhiệt độ: {data?.temperature}
								<IconTemperatureCelsius color="gray" size={14} stroke={1} />
							</Text>
							<Text size="sm">Cân nặng: {data?.bloodPressure}kg</Text>
							<Text size="sm">Chiều cao: {data?.pulse}cm</Text>
						</Group>
						<Text size="sm">
							Chẩn đoán:{' '}
							{data?.icdDiseases
								?.map((item) => item.icdDiseaseName)
								?.join(', ')}
						</Text>
						<Divider />
						{!!data?.testRecords?.length && (
							<>
								<Text size="sm" weight="bold">
									Xét nghiệm đi kèm
								</Text>
								<List size="sm">
									{data?.testRecords?.map((item) => (
										<List.Item key={item.id}>{item.operationName}</List.Item>
									))}
								</List>
							</>
						)}
						{!!data?.prescription?.details?.length && (
							<>
								<Text size="sm" weight="bold">
									Chỉ định dùng thuốc
								</Text>
								{data?.prescription?.details?.map((item, index) => (
									<Stack spacing={0} key={item.id}>
										<Group>
											<Text size="sm" weight={'bold'}>
												{index + 1}
											</Text>
											<Text size="sm">{item.medicineName}</Text>
											<Text size="sm" weight={'bold'}>
												{item.quantity} {item.unit}
											</Text>
										</Group>
										{item?.usage && <Text size="sm">{item.usage}</Text>}
										{/* <Text size="sm">{item.note}</Text> */}
										<Text size="xs">{renderDoseContent(item)}</Text>
									</Stack>
								))}
								<Divider />
							</>
						)}
						<Stack spacing="xs">
							<Group position="apart" align="baseline">
								<Stack spacing="xs">
									<Text size="sm">Ghi chú: {data?.doctorAdvice}</Text>
									<Text size="sm" weight={'bold'}>
										TÁI KHÁM:{' '}
										{data?.reExam?.date
											? formatDate(data?.reExam?.date)
											: 'Không'}
									</Text>
									<Text size="sm">Yêu cầu xét nghiệm trước:</Text>
									<Text size="sm">
										{data?.reExam?.operations
											?.map((item) => item.operationName)
											?.join(', ')}
									</Text>
									<Text size="sm">Lưu ý: {data?.reExam?.note}</Text>
								</Stack>
								<Stack align="center" spacing="xs">
									<Text size="xs">{formatDate(data.date, DATE_FORMAT)}</Text>
									<Text size="xs" transform="uppercase">
										Bác sĩ khám bệnh
									</Text>
									<Signature date={data.date} />
									<Text weight={'bold'} size="sm" transform="uppercase">
										BS {data?.doctorName}
									</Text>
								</Stack>
							</Group>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		</>
	)
}
export default PrintDetail
