import { Inject, Injectable, Logger } from '@nestjs/common';
import { SearchFlightDto } from './dto/search-flight.dto';
import { Flight } from './entities/flight.entity';
import { FLIGHT_TYPES } from './constants/flightTypes';
import { ClientProxy } from '@nestjs/microservices';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { firstValueFrom, catchError } from 'rxjs';
import { sortBy } from 'lodash';

@Injectable()
export class FlightService {
  private readonly logger = new Logger(FlightService.name);
  constructor(
    @Inject('AIRPORT_MICROSERVICE') private readonly airportClient: ClientProxy,
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  getAPIRoute(type: FLIGHT_TYPES): string {
    let route = '';

    switch (type) {
      case FLIGHT_TYPES.ONE_WAY:
        route = 'search-one-way';
        break;
      case FLIGHT_TYPES.ROUND_TRIP:
        route = 'search-roundtrip';
        break;
      case FLIGHT_TYPES.MULTI_CITY:
        route = 'search-multi-city';
        break;
      case FLIGHT_TYPES.EVERY_WHERE:
        route = 'search-everywhere';
        break;
      case FLIGHT_TYPES.INCOMPLETE:
        route = 'search-incomplete';
        break;
    }

    return `https://${this.configService.get('RAPID_API_HOST')}/flights/${route}`;
  }

  async getAirports(): Promise<any> {
    try {
      return this.airportClient.send('findAllAirport', {});
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async searchFlights(
    type: FLIGHT_TYPES,
    query: SearchFlightDto,
  ): Promise<Flight[]> {
    try {
      const queryString = SearchFlightDto.mapToQuery(query);
      const response = await firstValueFrom(
        this.httpService
          .get(`${this.getAPIRoute(type)}?${queryString}`, {
            headers: {
              'X-RapidAPI-Key': this.configService.get('RAPID_API_KEY'),
              'X-RapidAPI-Host': this.configService.get('RAPID_API_HOST'),
            },
          })
          .pipe(
            catchError((error: AxiosError) => {
              this.logger.error(error.response.data);
              throw 'An error happened!';
            }),
          ),
      );
      const flights = response.data.data?.itineraries;
      return sortBy(flights, (flight) => flight.price.raw);
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
