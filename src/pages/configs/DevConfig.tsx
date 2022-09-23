import ConfigInput from '@/components/Input/ConfigInput'
import { useGetConfigsQuery } from '@/store/configs/api'
import { CONFIG_TYPES } from '@/utils/enums'
import { Grid } from '@mantine/core'
import { useForm } from '@mantine/form'

const DevConfig = () => {
	const { data, isLoading } = useGetConfigsQuery({
		type: CONFIG_TYPES.DEV,
	})
	const form = useForm<Record<string, string>>({
		initialValues: {},
	})

	const onSubmit = async (values: any) => {
		console.log('values', values)
	}

	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<Grid mt={'sm'}>
				{data?.map((item) => (
					<Grid.Col span={6} key={item.id}>
						<ConfigInput
							id={item.id}
							name={item.name}
							defaultValue={item.value?.toString()}
							description={item.description}
							form={form}
						/>
					</Grid.Col>
				))}
			</Grid>
		</form>
	)
}
export default DevConfig
