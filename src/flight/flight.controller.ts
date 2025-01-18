import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Query,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { FlightService } from './flight.service';
import { FLIGHT_TYPES } from './constants/flightTypes';
import { SearchFlightDto } from './dto/search-flight.dto';
import { Airport } from 'src/airport/entities/airport.entity';
import { ApiParam, ApiQuery } from '@nestjs/swagger';

@Controller('flight')
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ type: Airport })
  @Get('cities')
  async getAllCities() {
    return this.flightService.getAirports();
  }

  @Get(':type')
  @ApiParam({ name: 'type', required: true, type: 'string', enum: FLIGHT_TYPES, example: FLIGHT_TYPES.ROUND_TRIP })
  @ApiQuery({ name: 'origin', required: true, type: 'string', example: 'NYCA' })
  @ApiQuery({ name: 'destination', required: true, type: 'string', example: 'MSYA' })
  @ApiQuery({ name: 'startDate', required: true, type: 'string', example: '2025-02-14' })
  @ApiQuery({ name: 'endDate', required: true, type: 'string', example: '2025-02-15' })
  async search(
    @Param('type') type: FLIGHT_TYPES,
    @Query() query: SearchFlightDto,
  ) {
    return this.flightService.searchFlights(type, query);
  }
}
