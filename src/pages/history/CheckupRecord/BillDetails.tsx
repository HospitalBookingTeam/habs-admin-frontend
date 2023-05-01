import { Bill, BillDetail } from '@/entities/bill'
import { formatCurrency } from '@/utils/formats'
import { translateEnumInsuranceStatus } from '@/utils/enums'
import { Stack, Title, Table, Text } from '@mantine/core'

const BillDetails = ({ data }: { data?: BillDetail[] }) => {
	const rows = data?.map((item, index) => (
		<tr key={item.id}>
			<td>{index + 1}</td>
			<td>{item.operationName}</td>
			<td>{translateEnumInsuranceStatus(item.insuranceStatus)}</td>
			<td className="right">
				{item?.price ? formatCurrency(item.price) : '---'}
			</td>
			<td className="right">{item?.quantity ? item.quantity : '---'}</td>
			<td className="right">
				{item?.subTotal ? formatCurrency(item.subTotal) : '---'}
			</td>
		</tr>
	))

	const ths = (
		<>
			<tr>
				<th />
				<th />
				<th />
				<th />
				<th />
				<th />
				{/* <th className="right">Tổng cộng</th>
				<th className="right">
					{data?.total ? formatCurrency(data.total) : '---'}
				</th> */}
			</tr>
		</>
	)

	return (
		<Stack sx={{ flex: 1 }}>
			<Stack sx={{ gap: 0 }}>
				<Table striped={true} verticalSpacing="sm">
					<thead>
						<tr>
							<th>
								<Text size="xs">STT</Text>
							</th>
							<th>
								<Text size="xs">Tên</Text>
							</th>
							<th>
								<Text size="xs">Tình trạng BHYT</Text>
							</th>
							<th className="right">
								<Text size="xs">ĐG</Text>
							</th>
							<th className="right">
								<Text size="xs">SL</Text>
							</th>
							<th className="right">
								<Text size="xs">T.Tiền</Text>
							</th>
						</tr>
					</thead>
					<tbody>{rows}</tbody>
					<tfoot>{ths}</tfoot>
				</Table>
				{/* <Stack align={'end'} px="sm">
					<Text size="sm" italic={true}>
						{data?.totalInWord}
					</Text>
				</Stack> */}
			</Stack>
		</Stack>
	)
}

export default BillDetails
