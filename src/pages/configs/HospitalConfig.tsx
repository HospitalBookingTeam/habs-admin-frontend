import ConfigInput from '@/components/Input/ConfigInput'
import { useGetConfigsQuery } from '@/store/configs/api'
import { CONFIG_TYPES } from '@/utils/enums'
import { Grid, Stack, Center, Loader } from '@mantine/core'
import { useForm } from '@mantine/form'

const HospitalConfig = () => {
	const { data, isLoading } = useGetConfigsQuery({
		type: CONFIG_TYPES.HOSPITAL,
	})
	const form = useForm<Record<string, string>>({})

	const onSubmit = async (values: any) => {
		console.log('values', values)
	}

	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<Stack sx={{ height: 450, display: isLoading ? 'flex' : 'none' }}>
				<Center>
					<Loader size="lg" />
				</Center>
			</Stack>
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
export default HospitalConfig
