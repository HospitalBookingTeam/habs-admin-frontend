import { Paper, Tabs } from '@mantine/core'
import { IconCalendar, IconCash } from '@tabler/icons'
import ImportSchedule from './schedule'
import ImportPrice from './price'

const ImportData = () => {
	return (
		<Paper p="md">
			<Tabs defaultValue="schedule">
				<Tabs.List>
					<Tabs.Tab value="schedule" icon={<IconCalendar size="0.8rem" />}>
						Lịch khám bệnh
					</Tabs.Tab>
					<Tabs.Tab value="price" icon={<IconCash size="0.8rem" />}>
						Bảng giá dịch vụ
					</Tabs.Tab>
				</Tabs.List>

				<Tabs.Panel value="schedule" pt="xs">
					<ImportSchedule />
				</Tabs.Panel>

				<Tabs.Panel value="price" pt="xs">
					<ImportPrice />
				</Tabs.Panel>
			</Tabs>
		</Paper>
	)
}
export default ImportData
