export interface TestRecordStatistics {
	notPaidCount: number
	paidCount: number
	checkedInCount: number
	testInProgressCount: number
	operationFinishedCount: number
	resultFilledCount: number
}

export interface IStatistics {
	annonymousCount: number
	bookedAndPaidCount: number
	checkedInCount: number
	inProgressCount: number
	testArrangedCount: number
	testPaidCount: number
	testResultsReadyCount: number
	checkedInAfterTestsCount: number
	finishedCount: number
	testRecords: TestRecordStatistics
}
