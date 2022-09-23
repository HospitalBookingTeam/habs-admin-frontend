import { ConfigItem, ConfigRequest } from '@/entities/config'
import { api } from '../api'

export const configApi = api.injectEndpoints({
	endpoints: (build) => ({
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
	}),
})

export const { useUpdateConfigMutation, useGetConfigsQuery } = configApi

export const {
	endpoints: { updateConfig, getConfigs },
} = configApi
