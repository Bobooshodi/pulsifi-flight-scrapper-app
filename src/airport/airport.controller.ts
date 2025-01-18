import {
  ClassSerializerInterceptor,
  Controller,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AirportService } from './airport.service';
import { Airport } from './entities/airport.entity';

@Controller()
export class AirportController {
  constructor(private readonly airportService: AirportService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ type: Airport })
  @MessagePattern('findAllAirport')
  async findAll(): Promise<Airport[]> {
    return this.airportService.findAll();
  }

  @MessagePattern('findOneAirport')
  async findOne(@Payload() query: string): Promise<Airport> {
    return this.airportService.findOne(query);
  }
}
