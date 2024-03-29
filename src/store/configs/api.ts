import { ConfigItem, ConfigRequest } from '@/entities/config'
import { api } from '../api'
import { IScheduleDoctor, IScheduleSlotOfDoctor } from '@/entities/schedule'

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
					responseHandler: async (response) => {
						const blob = await response.blob()
						const filename = response.headers
							?.get('content-disposition')
							?.split('filename=')[1]
						const url = window.URL.createObjectURL(blob)
						const link = document.createElement('a')
						link.href = url
						link.setAttribute('download', filename ?? '')
						document.body.appendChild(link)
						link.click()
					},
					cache: 'no-cache',
				}
			},
		}),
		updateSchedule: build.mutation<void, { startDate: string; data: any }>({
			query: (body) => ({
				url: `schedule/schedule-table`,
				params: {
					'start-date': body.startDate,
				},
				method: 'POST',
				body: body.data,
			}),
		}),
		downloadOperationPrice: build.query<any, { startDate: string }>({
			query(args) {
				return {
					url: `price/price-table`,
					params: args,
					responseHandler: async (response) => {
						const blob = await response.blob()
						const filename = response.headers
							?.get('content-disposition')
							?.split('filename=')[1]
						const url = window.URL.createObjectURL(blob)
						const link = document.createElement('a')
						link.href = url
						link.setAttribute('download', filename ?? '')
						document.body.appendChild(link)
						link.click()
					},
					cache: 'no-cache',
				}
			},
		}),
		updateOperationPrice: build.mutation<
			void,
			{ startDate: string; data: any }
		>({
			query: (body) => ({
				url: `price/price-table`,
				params: {
					'start-date': body.startDate,
				},
				method: 'POST',
				body: body.data,
			}),
		}),
		clearCache: build.query<void, void>({
			query: () => ({
				url: 'test/clear-cache',
			}),
		}),
		getScheduleByDoctor: build.query<IScheduleDoctor[], { date?: string }>({
			query: (params) => ({
				url: 'schedule/doctor',
				params,
			}),
		}),
		getSlotsByDoctor: build.query<
			IScheduleSlotOfDoctor[],
			{ date?: string; doctorId: string }
		>({
			query: (params) => ({
				url: 'schedule/slots-for-doctor',
				params,
			}),
		}),
	}),
})

export const {
	useUpdateConfigMutation,
	useGetConfigsQuery,
	useLazyDownloadScheduleQuery,
	useLazyGetTimeQuery,
	useUpdateScheduleMutation,
	useLazyDownloadOperationPriceQuery,
	useUpdateOperationPriceMutation,
	useLazyClearCacheQuery,
	useLazyGetScheduleByDoctorQuery,
	useLazyGetSlotsByDoctorQuery,
} = configApi

export const {
	endpoints: { updateConfig, getConfigs },
} = configApi
