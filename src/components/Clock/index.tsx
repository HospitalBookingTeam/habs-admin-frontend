import { selectTime } from '@/store/configs/selectors'
import { useAppSelector } from '@/store/hooks'
import { formatDate } from '@/utils/formats'
import { Group, Badge, Tooltip, Text } from '@mantine/core'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

const DATE_FORMAT = 'DD/MM/YYYY, HH:mm'
const Clock = () => {
	const [currentTime, setCurrentTime] = useState(
		formatDate(new Date().toString(), DATE_FORMAT)
	)
	const configTime = useAppSelector(selectTime)

	useEffect(() => {
		setCurrentTime(
			formatDate(dayjs().valueOf() + (configTime ?? 0), DATE_FORMAT)
		)
	}, [configTime])

	useEffect(() => {
		const interval = setInterval(
			() =>
				setCurrentTime(
					formatDate(dayjs().valueOf() + (configTime ?? 0), DATE_FORMAT)
				),
			10000
		)

		return () => clearInterval(interval)
	}, [configTime])

	return (
		<Tooltip label={currentTime} position="right" transitionDuration={0}>
			<Group>
				<Text
					px="sm"
					size="md"
					variant="gradient"
					weight="bolder"
					gradient={{ from: 'green', to: 'lime', deg: 45 }}
				>
					{currentTime}
				</Text>
			</Group>
		</Tooltip>
	)
}
export default Clock
