import { Controller, Get, Param, Query } from '@nestjs/common';
import { FlightService } from './flight.service';
import { FLIGHT_TYPES } from './constants/flightTypes';
import { SearchFlightDto } from './dto/search-flight.dto';

@Controller('flight')
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @Get('cities')
  async getAllCities() {
    return this.flightService.getAirports();
  }

  @Get(':type')
  async search(
    @Param('type') type: FLIGHT_TYPES,
    @Query() query: SearchFlightDto,
  ) {
    return this.flightService.searchFlights(type, query);
  }
}
