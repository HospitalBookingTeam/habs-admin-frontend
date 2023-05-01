import { Bill } from '@/entities/bill'
import { translateBill } from '@/utils/enums'
import { formatCurrency, formatDate } from '@/utils/formats'
import { Group, Avatar, Text, Accordion, Stack, List } from '@mantine/core'
import BillDetails from './BillDetails'

interface AccordionLabelProps {
	label: string
	description: string
}

function AccordionLabel({ title, code, total, timeCreated }: Bill) {
	return (
		<Group noWrap>
			<div>
				<Text>{code}</Text>
				<Group position="apart">
					<Text size="sm" color="dimmed" weight={400}>
						{formatDate(timeCreated, 'DD/MM/YYYY')}
					</Text>
					<Text size="sm" color="dimmed" weight={400}>
						{formatCurrency(total)}
					</Text>
				</Group>
			</div>
		</Group>
	)
}

const Bills = ({ data }: { data: Bill[] }) => {
	const items = data?.map((item) => (
		<Accordion.Item value={item.id.toString()} key={item.code}>
			<Accordion.Control>
				<AccordionLabel {...item} />
			</Accordion.Control>
			<Accordion.Panel>
				<Stack spacing={'sm'}>
					<Stack spacing={0}>
						<Text size={'xs'} weight={'bolder'}>
							Thời gian
						</Text>
						<Text size="sm">{formatDate(item.timeCreated)}</Text>
					</Stack>
					<Stack spacing={0}>
						<Text size={'xs'} weight={'bolder'}>
							Nội dung
						</Text>
						<Text size="sm">{item.content}</Text>
					</Stack>
					<Stack spacing={0}>
						<Text size={'xs'} weight={'bolder'}>
							Tổng tiền
						</Text>
						<Text size="sm">{formatCurrency(item.total)}</Text>
						<Text italic size="sm">
							{item.totalInWord}
						</Text>
					</Stack>
					{item?.cashierName && (
						<Stack spacing={0}>
							<Text size={'xs'} weight={'bolder'}>
								Thu ngân
							</Text>
							<Text size="sm">{item.cashierName}</Text>
						</Stack>
					)}
					<Stack spacing={0}>
						<Text size={'xs'} weight={'bolder'}>
							Tình trạng
						</Text>
						<Text size="sm">{translateBill(item.status)}</Text>
					</Stack>
					<Stack spacing={0}>
						<Text size={'xs'} weight={'bolder'}>
							Người bệnh
						</Text>
						<Text size="sm">{item.patientName}</Text>
					</Stack>
					<Stack spacing={0}>
						<Text size={'xs'} weight={'bolder'}>
							Danh mục thanh toán
						</Text>
						<BillDetails data={item.details} />
						{/* <List type="ordered" size="sm">
							{item.details?.map((item) => (
								<List.Item key={item.id}>
									{item.operationName} - {formatCurrency(item.price)} - SL:{' '}
									{item.quantity} - {formatCurrency(item.subTotal)}
								</List.Item>
							))}
						</List> */}
					</Stack>
				</Stack>
			</Accordion.Panel>
		</Accordion.Item>
	))

	return (
		<Accordion chevronPosition="right" variant="contained">
			{items}
		</Accordion>
	)
}

export default Bills
