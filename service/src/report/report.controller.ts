import { Controller, Get, Query } from "@nestjs/common";
import { ReportService } from "./report.service";
import { MostSearchWithinThePeriodQueryParams, TopTenSearchWithinThePeriodQueryParams } from "./dto";

@Controller('v1/report')
export class ReportController {
    constructor(private reportService: ReportService) {}

	@Get('get/most-recent-ten-search')
	getMostRecentTenSearch() {
		return this.reportService.getMostRecentTenSearch();
	}

	@Get('get/top-ten-search-within-the-period')
	getTopTenSearchWithinThePeriod(@Query() queryParams: TopTenSearchWithinThePeriodQueryParams) {
		const { startDateTime, endDateTime } = queryParams;
		return this.reportService.getTopTenSearchWithinThePeriod({ startDateTime, endDateTime });
	}

	@Get('get/most-search-within-the-period')
	getMostSearchWithinThePeriod(@Query() queryParams: MostSearchWithinThePeriodQueryParams) {
		const { startDateTime, endDateTime, period } = queryParams;
		return this.reportService.getMostSearchWithinThePeriod({ startDateTime, endDateTime, period });
	}
}
