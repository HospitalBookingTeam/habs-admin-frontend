import { useRef, useState } from 'react'
import { Text, Group, Button, createStyles } from '@mantine/core'
import {
	Dropzone,
	MIME_TYPES,
	DropzoneProps,
	FileWithPath,
} from '@mantine/dropzone'
import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons'

const useStyles = createStyles((theme) => ({
	wrapper: {
		position: 'relative',
		marginBottom: 2,
	},

	dropzone: {
		borderWidth: 0.5,
		paddingBottom: 24,
	},

	icon: {
		color:
			theme.colorScheme === 'dark'
				? theme.colors.dark[3]
				: theme.colors.gray[4],
	},

	control: {
		position: 'absolute',
		width: 150,
		left: `calc(50% - 75px)`,
		bottom: -16,
		background: theme.white,
	},
}))

const DropzoneButton = (props: Partial<DropzoneProps>) => {
	const { classes, theme } = useStyles()
	const openRef = useRef<() => void>(null)
	const [file, setFile] = useState<FileWithPath[] | null>(null)

	const handleSetFile = (files: FileWithPath[] | null) => {
		setFile(files)
		if (props?.onChange) {
			props.onChange(files as any)
		}
	}

	return (
		<div className={classes.wrapper}>
			<Dropzone
				openRef={openRef}
				className={classes.dropzone}
				radius="md"
				accept={[MIME_TYPES.xls]}
				maxSize={30 * 1024 ** 2}
				onDrop={(files) => {
					handleSetFile(files)
				}}
				{...props}
			>
				<div style={{ pointerEvents: 'none' }}>
					<Group position="center">
						<Dropzone.Accept>
							<IconDownload
								size={40}
								color={theme.colors[theme.primaryColor][6]}
								stroke={1.5}
							/>
						</Dropzone.Accept>
						<Dropzone.Reject>
							<IconX size={40} color={theme.colors.red[6]} stroke={1.5} />
						</Dropzone.Reject>
						<Dropzone.Idle>
							<IconCloudUpload
								size={40}
								color={
									theme.colorScheme === 'dark'
										? theme.colors.dark[0]
										: theme.black
								}
								stroke={1.5}
							/>
						</Dropzone.Idle>
					</Group>

					{!file ? (
						<Text align="center" weight={700} size="lg" mt="lg">
							<Dropzone.Accept>Kéo thả file ở đây</Dropzone.Accept>
							<Dropzone.Reject>Dung lượng không vượt quá 5mb</Dropzone.Reject>
							<Dropzone.Idle>Upload file</Dropzone.Idle>
						</Text>
					) : (
						<Text align="center" weight={700} size="lg" mt="lg">
							{file?.[0]?.name}
						</Text>
					)}
					<Text align="center" size="sm" mt="xs" color="dimmed">
						Kéo thả file ở đây. Chỉ chấp nhận file <i>.xls</i> dưới 5mb.
					</Text>
				</div>
			</Dropzone>

			<Button
				className={classes.control}
				size="sm"
				radius="xl"
				variant="outline"
				onClick={() => openRef.current?.()}
			>
				Chọn file
			</Button>
		</div>
	)
}

export default DropzoneButton
