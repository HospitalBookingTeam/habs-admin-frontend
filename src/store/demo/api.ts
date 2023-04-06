import { IScriptResponse, IScriptRequest } from '@/entities/script'
import { api } from '../api'

export const configApi = api.injectEndpoints({
	endpoints: (build) => ({
		script1: build.mutation<IScriptResponse, IScriptRequest>({
			query: (params) => ({
				url: 'test/script1',
				method: 'GET',
				params,
			}),
			extraOptions: {
				maxRetries: 1,
			},
		}),
		script2: build.mutation<IScriptResponse, IScriptRequest>({
			query: (params) => ({
				url: 'test/script2',
				method: 'GET',
				params,
			}),
			extraOptions: {
				maxRetries: 1,
			},
		}),
		script3: build.mutation<IScriptResponse, IScriptRequest>({
			query: (params) => ({
				url: 'test/script3',
				method: 'GET',
				params,
			}),
			extraOptions: {
				maxRetries: 1,
			},
		}),
		script4: build.mutation<IScriptResponse, IScriptRequest>({
			query: (params) => ({
				url: 'test/script4',
				method: 'GET',
				params,
			}),
			extraOptions: {
				maxRetries: 1,
			},
		}),
		script5: build.mutation<IScriptResponse, IScriptRequest>({
			query: (params) => ({
				url: 'test/script5',
				method: 'GET',
				params,
			}),
			extraOptions: {
				maxRetries: 1,
			},
		}),
		script6: build.mutation<IScriptResponse, IScriptRequest>({
			query: (params) => ({
				url: 'test/script6',
				method: 'GET',
				params,
			}),
			extraOptions: {
				maxRetries: 1,
			},
		}),
		script7: build.mutation<IScriptResponse, IScriptRequest>({
			query: (params) => ({
				url: 'test/script7',
				method: 'GET',
				params,
			}),
			extraOptions: {
				maxRetries: 1,
			},
		}),
		script8: build.mutation<IScriptResponse, IScriptRequest>({
			query: (params) => ({
				url: 'test/script8',
				method: 'GET',
				params,
			}),
			extraOptions: {
				maxRetries: 1,
			},
		}),
		script9: build.mutation<IScriptResponse, IScriptRequest>({
			query: (params) => ({
				url: 'test/script9',
				method: 'GET',
				params,
			}),
			extraOptions: {
				maxRetries: 1,
			},
		}),
		remindToFollowup: build.mutation<void, void>({
			query: () => ({
				url: 'test/fire-reexam-remind-test',
				method: 'GET',
			}),
			extraOptions: {
				maxRetries: 1,
			},
		}),
		getNow: build.query<string, void>({
			query: () => ({
				url: 'test/now',
				responseHandler: (response) => response.text(),
			}),
		}),
		changeNow: build.mutation<void, string>({
			query: (now) => ({
				url: 'test/now',
				method: 'POST',
				body: {
					now,
				},
				// responseHandler: (response) => response.text(),
			}),
			extraOptions: {
				maxRetries: 1,
			},
		}),
	}),
})

export const {
	useScript1Mutation,
	useScript2Mutation,
	useScript3Mutation,
	useScript4Mutation,
	useScript5Mutation,
	useScript6Mutation,
	useScript7Mutation,
	useScript8Mutation,
	useScript9Mutation,
	useGetNowQuery,
	useChangeNowMutation,
	useRemindToFollowupMutation,
} = configApi

export const {
	endpoints: {},
} = configApi
