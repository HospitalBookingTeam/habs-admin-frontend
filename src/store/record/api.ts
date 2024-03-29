import { HistoryCheckupRecord, HistoryTestRecord } from '@/entities/history'
import {
	CheckupListGetRequest,
	CheckupRecordList,
	TestRecordList,
	TestListGetRequest,
} from '@/entities/record'
import { Room } from '@/entities/room'
import { api } from '../api'
import { IStatistics } from '@/entities/statistics'
import { ReExamTree } from '@/entities/reexam'

export const recordApi = api.injectEndpoints({
	endpoints: (build) => ({
		getCheckupRecords: build.query<
			CheckupRecordList,
			Partial<CheckupListGetRequest>
		>({
			query: ({ statusToExclude, statusToInclude, roomIds, ...params }) => {
				let excludes = ''
				let includes = ''
				let roomIdList = ''
				statusToExclude?.forEach((status) => {
					excludes += `status-to-exclude=${status}&`
				})
				statusToInclude?.forEach((status) => {
					includes += `status-to-include=${status}&`
				})
				roomIds?.forEach((status) => {
					includes += `room-ids=${status}&`
				})
				return {
					url: `checkup-records?${excludes}${includes}${roomIdList}`,
					params: {
						...params,
					},
				}
			},
		}),
		getTestRecords: build.query<TestRecordList, Partial<TestListGetRequest>>({
			query: ({ statusToExclude, statusToInclude, roomIds, ...params }) => {
				let excludes = ''
				let includes = ''
				let roomIdList = ''
				statusToExclude?.forEach((status) => {
					excludes += `status-to-exclude=${status}&`
				})
				statusToInclude?.forEach((status) => {
					includes += `status-to-include=${status}&`
				})
				roomIds?.forEach((status) => {
					includes += `room-ids=${status}&`
				})
				return {
					url: `test-records?${excludes}${includes}${roomIdList}`,
					params: {
						...params,
					},
				}
			},
		}),
		getCheckupRecordById: build.query<HistoryCheckupRecord, { id?: number }>({
			query: (body) => ({
				url: `checkup-records/${body.id}`,
			}),
		}),
		getTestRecordById: build.query<HistoryTestRecord, { id?: number }>({
			query: (body) => ({
				url: `test-records/${body.id}`,
			}),
		}),
		getRoomList: build.query<Room[], void>({
			query: () => ({
				url: `rooms`,
			}),
			providesTags: (result = []) => [
				...result.map(({ id }) => ({ type: 'Misc', id } as const)),
				{ type: 'Misc' as const, id: 'ROOMS' },
			],
		}),
		getExamRoomList: build.query<Room[], void>({
			query: () => ({
				url: `rooms/exam-room`,
			}),
			providesTags: (result = []) => [
				...result.map(
					({ id }) => ({ type: 'Misc', id: `exam_${id}` } as const)
				),
				{ type: 'Misc' as const, id: 'EXAM_ROOMS' },
			],
		}),
		getStatistics: build.query<IStatistics, { from?: string; to?: string }>({
			query: (params) => ({
				url: `checkup-records/statistic`,
				params,
			}),
		}),
		getReExamTree: build.query<ReExamTree, string>({
			query: (id) => ({
				url: `re-exam-tree/${id}`,
			}),
		}),
		getReExamTreeByPatientId: build.query<ReExamTree[], string>({
			query: (id) => ({
				url: `re-exam-tree/patient/${id}`,
			}),
			providesTags: (result = []) => [
				...result.map(
					({ id }) => ({ type: 'Record', field: 'reExamTree', id } as const)
				),
				{ type: 'Record' as const, patient: true, id: 'ListReExamTree' },
			],
		}),
	}),
})

export const {
	useGetCheckupRecordsQuery,
	useGetTestRecordsQuery,
	useGetCheckupRecordByIdQuery,
	useGetTestRecordByIdQuery,
	useGetRoomListQuery,
	useGetExamRoomListQuery,
	useGetStatisticsQuery,
	useGetReExamTreeByPatientIdQuery,
	useGetReExamTreeQuery,
} = recordApi

export const {
	endpoints: {
		getCheckupRecords,
		getCheckupRecordById,
		getRoomList,
		getExamRoomList,
	},
} = recordApi
