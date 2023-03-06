import { ConfigItem, ConfigRequest } from '@/entities/config'
import { api } from '../api'

export const configApi = api.injectEndpoints({
	endpoints: (build) => ({
		getTime: build.query<{ time: number }, void>({
			query: () => ({
				url: 'time',
			}),
		}),
		getConfigs: build.query<ConfigItem[], ConfigRequest>({
			query: (params) => ({
				url: 'configs',
				params,
			}),
		}),
		updateConfig: build.mutation<void, { id: number; value: string }>({
			query: (body) => ({
				url: `configs/${body.id}`,
				method: 'POST',
				body: { value: body.value },
			}),
		}),
		downloadSchedule: build.query<any, { startDate: string }>({
			query(args) {
				return {
					url: `schedule/schedule-table`,
					params: args,
					responseHandler: async (response) =>
						window.location.assign(
							window.URL.createObjectURL(await response.blob())
						),
					cache: 'no-cache',
				}
			},
		}),
	}),
})

export const {
	useUpdateConfigMutation,
	useGetConfigsQuery,
	useDownloadScheduleQuery,
	useLazyGetTimeQuery,
} = configApi

export const {
	endpoints: { updateConfig, getConfigs },
} = configApi
