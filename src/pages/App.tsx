import { lazy, Suspense, useEffect, useLayoutEffect } from 'react'
import {
	Routes,
	Route,
	Outlet,
	Navigate,
	useNavigate,
	useSearchParams,
	useLocation,
} from 'react-router-dom'
import { LoadingOverlay } from '@mantine/core'
import { selectIsAuthenticated } from '@/store/auth/selectors'
import { useAppSelector } from '@/store/hooks'
import LayoutAppShell from '@/components/Layout'
import { useGetConfigsQuery, useLazyGetTimeQuery } from '@/store/configs/api'
import { SpotlightAction, SpotlightProvider } from '@mantine/spotlight'
import { IconSearch } from '@tabler/icons'
import { convertConfigEnumValueToKey } from '@/utils/enums'
import { selectTime } from '@/store/configs/selectors'

const Login = lazy(() => import('@/pages/auth'))

const ConfigContainer = lazy(() => import('@/pages/configs'))

const NotFound = lazy(() => import('@/components/NotFound/NotFoundPage'))

const CheckupRecordHistory = lazy(() => import('@/pages/history/CheckupRecord'))
const TestRecordHistory = lazy(() => import('@/pages/history/TestRecord'))

const ManageRecords = lazy(() => import('@/pages/records'))
const DemoScript = lazy(() => import('@/pages/demo'))
const ImportSchedule = lazy(() => import('@/pages/schedule'))

const App = () => {
	const isAuthenticated = useAppSelector(selectIsAuthenticated)
	const configTime = useAppSelector(selectTime)
	const [triggerTimeConfig] = useLazyGetTimeQuery()
	useEffect(() => {
		const getTime = async () => {
			await triggerTimeConfig()
		}
		if (isAuthenticated && configTime === null) {
			getTime()
		}
	}, [isAuthenticated, configTime])

	const { data: configList } = useGetConfigsQuery({})
	const [, setSearchParams] = useSearchParams()
	const navigate = useNavigate()
	const location = useLocation()
	const spotlightActions: SpotlightAction[] | undefined = configList?.map(
		(item) => ({
			title: item.name,
			description: item.description,
			onTrigger: () => {
				console.log('location.pathname', location.pathname)
				if (location.pathname === '/') {
					setSearchParams({
						tabs: convertConfigEnumValueToKey(item.type),
						id: item.id.toString(),
					})
					// document.getElementById(item.id.toString())?.scrollIntoView()
				} else {
					navigate(
						`/?tabs=${convertConfigEnumValueToKey(
							item.type
						)}&id=${item.id.toString()}`
					)
				}
			},
		})
	)

	return (
		<SpotlightProvider
			actions={spotlightActions ?? []}
			searchIcon={<IconSearch size={18} />}
			searchPlaceholder="Tìm config..."
			shortcut={null}
			nothingFoundMessage="Không tìm thấy kết quả..."
		>
			<Suspense fallback={<LoadingOverlay visible={true} />}>
				<Routes>
					<Route path="/" element={<Outlet />}>
						<Route element={<RequireAuth />}>
							<Route index element={<ConfigContainer />} />

							<Route path="records" element={<Outlet />}>
								<Route index element={<ManageRecords />} />
								<Route path=":id" element={<CheckupRecordHistory />} />
							</Route>
							<Route path="tests" element={<Outlet />}>
								<Route path=":id" element={<TestRecordHistory />} />
							</Route>
							<Route path="schedule" element={<ImportSchedule />} />
						</Route>
					</Route>
					<Route path="/login" element={<IsUserRedirect />}>
						<Route index element={<Login />} />
					</Route>
					<Route path="/demo" element={<DemoScript />}></Route>

					<Route path="*" element={<NotFound />} />
				</Routes>
			</Suspense>
		</SpotlightProvider>
	)
}

const RequireAuth = () => {
	const isAuthenticated = useAppSelector(selectIsAuthenticated)

	const navigate = useNavigate()
	useLayoutEffect(() => {
		if (isAuthenticated) return
		navigate('/login')
	}, [isAuthenticated, navigate])

	return isAuthenticated ? (
		<LayoutAppShell>
			<Outlet />
		</LayoutAppShell>
	) : (
		<Navigate to={'/login'} />
	)
}
const IsUserRedirect = () => {
	const isAuthenticated = useAppSelector(selectIsAuthenticated)
	return !isAuthenticated ? <Outlet /> : <Navigate to={'/'} />
}

export default App
