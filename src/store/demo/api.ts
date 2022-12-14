import { api } from '../api'

export const configApi = api.injectEndpoints({
	endpoints: (build) => ({
		script1: build.mutation<void, number>({
			query: (quantity) => ({
				url: 'test/script1',
				method: 'GET',
				params: {
					quantity,
				},
				responseHandler: (response) => response.text(),
			}),
			extraOptions: {
				maxRetries: 1,
			},
		}),
		script2: build.mutation<void, number>({
			query: (quantity) => ({
				url: 'test/script2',
				method: 'GET',
				params: {
					quantity,
				},
				responseHandler: (response) => response.text(),
			}),
			extraOptions: {
				maxRetries: 1,
			},
		}),
		script3: build.mutation<void, number>({
			query: (quantity) => ({
				url: 'test/script3',
				method: 'GET',
				params: {
					quantity,
				},
				responseHandler: (response) => response.text(),
			}),
			extraOptions: {
				maxRetries: 1,
			},
		}),
		script4: build.mutation<void, number>({
			query: (quantity) => ({
				url: 'test/script4',
				method: 'GET',
				params: {
					quantity,
				},
				responseHandler: (response) => response.text(),
			}),
			extraOptions: {
				maxRetries: 1,
			},
		}),
		script5: build.mutation<void, number>({
			query: (quantity) => ({
				url: 'test/script5',
				method: 'GET',
				params: {
					quantity,
				},
				responseHandler: (response) => response.text(),
			}),
			extraOptions: {
				maxRetries: 1,
			},
		}),
		script6: build.mutation<void, number>({
			query: (quantity) => ({
				url: 'test/script6',
				method: 'GET',
				params: {
					quantity,
				},
				responseHandler: (response) => response.text(),
			}),
			extraOptions: {
				maxRetries: 1,
			},
		}),
		script7: build.mutation<void, number>({
			query: (quantity) => ({
				url: 'test/script7',
				method: 'GET',
				params: {
					quantity,
				},
				responseHandler: (response) => response.text(),
			}),
			extraOptions: {
				maxRetries: 1,
			},
		}),
		script8: build.mutation<void, number>({
			query: (quantity) => ({
				url: 'test/script8',
				method: 'GET',
				params: {
					quantity,
				},
				responseHandler: (response) => response.text(),
			}),
			extraOptions: {
				maxRetries: 1,
			},
		}),
		script9: build.mutation<void, number>({
			query: (quantity) => ({
				url: 'test/script9',
				method: 'GET',
				params: {
					quantity,
				},
				responseHandler: (response) => response.text(),
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
} = configApi

export const {
	endpoints: {},
} = configApi
