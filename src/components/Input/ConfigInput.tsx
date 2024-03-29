import { useUpdateConfigMutation } from '@/store/configs/api'
import { bounce } from '@/utils/useGlobalStyles'
import {
	Badge,
	Group,
	Paper,
	Stack,
	Text,
	Spoiler,
	TextInput,
	createStyles,
	ThemeIcon,
	Button,
	Transition,
	Divider,
} from '@mantine/core'
import { UseFormReturnType } from '@mantine/form/lib/types'
import { showNotification } from '@mantine/notifications'
import { IconCheck, IconCircleCheck, IconInfoCircle } from '@tabler/icons'
import { useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'

type ConfigInputProps = {
	id: number
	name: string
	description: string
	defaultValue: string
	form: UseFormReturnType<Record<string, string>>
}

const useStyles = createStyles((theme) => ({
	searched: {
		animation: `${bounce} 2s ease-in-out`,
	},
	container: {
		background: theme.colors.gray[0],
	},
}))

const ConfigInput = ({
	id,
	name,
	defaultValue = '',
	description,
	form,
}: ConfigInputProps) => {
	const idString = id.toString()
	const [searchParams] = useSearchParams()
	const { classes, cx } = useStyles()
	const { isDirty, getInputProps, setDirty } = form
	const isAnimate = searchParams.get('id') === idString
	const ref = useRef<HTMLDivElement | null>(null)

	const [updateConfigMutation, { isLoading: isLoadingUpdate }] =
		useUpdateConfigMutation()

	const { value = defaultValue, ...restOfInputProps } = getInputProps(idString)
	const [isUnsaved, setIsUnsaved] = useState(false)

	const onUpdateConfig = async () => {
		await updateConfigMutation({ id, value })
			.unwrap()
			.then(() => {
				showNotification({
					title: 'Cập nhật thành công',
					message: <></>,
				})
				setIsUnsaved(false)
				setDirty({ idString: false })
			})
	}

	useEffect(() => {
		if (!isDirty(idString) || value === '') {
			setIsUnsaved(false)
		}
	}, [isDirty, value])

	useEffect(() => {
		if (isAnimate) {
			ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
		}
	}, [isAnimate])

	return (
		<Paper
			className={cx({
				[classes.searched]: isAnimate,
				[classes.container]: true,
			})}
			withBorder={true}
			p="sm"
			id={id.toString()}
			ref={ref}
			sx={{ background: 'white' }}
		>
			<Stack>
				<Stack spacing={'xs'}>
					<Group align="baseline">
						<Text weight={500}>{name}</Text>
						<Badge color="cyan">{id}</Badge>
					</Group>
					<Divider />
				</Stack>
				<Spoiler maxHeight={40} showLabel="Xem thêm" hideLabel="Thu gọn">
					<Text size="sm" color="dimmed">
						{description}
					</Text>
				</Spoiler>
				<TextInput
					placeholder="vd. 1"
					value={value}
					onBlur={() => {
						if (isDirty(idString) && value !== '') {
							setIsUnsaved(true)
						}
					}}
					{...restOfInputProps}
				/>
				<Transition mounted={isUnsaved} transition="fade" duration={400}>
					{(styles) => (
						<Group
							styles={styles}
							align="center"
							sx={{ display: isUnsaved ? 'flex' : 'none' }}
						>
							<ThemeIcon color="gray" size="xs" variant="outline">
								<IconInfoCircle />
							</ThemeIcon>
							<Text size="xs" color="dimmed">
								Bạn có thay đổi chưa được lưu.
							</Text>
							<Button
								rightIcon={<IconCircleCheck size="16" />}
								size="xs"
								variant="subtle"
								onClick={onUpdateConfig}
								loading={isLoadingUpdate}
							>
								Lưu thay đổi
							</Button>
						</Group>
					)}
				</Transition>
			</Stack>
		</Paper>
	)
}
export default ConfigInput
