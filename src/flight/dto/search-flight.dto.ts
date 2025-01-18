import { IsNotEmpty } from 'class-validator';
import * as dayjs from 'dayjs';

export class SearchFlightDto {
  @IsNotEmpty()
  origin: string;

  @IsNotEmpty()
  destination: string;

  @IsNotEmpty()
  startDate: string;

  @IsNotEmpty()
  endDate: string;

  stops: number;
  adults: number;
  children: number;
  infants: number;
  class: string;
  currency: string;

  public static mapToQuery(searchFlightDto: SearchFlightDto) {
    let query = `fromEntityId=${searchFlightDto.origin}`;

    if (searchFlightDto.destination) {
      query += `&toEntityId=${searchFlightDto.destination}`;
    }
    if (searchFlightDto.startDate) {
      const date = dayjs(searchFlightDto.startDate).format('YYYY-MM-DD');
      query += `&departDate=${date}`;
    }
    if (searchFlightDto.endDate) {
      const date = dayjs(searchFlightDto.endDate).format('YYYY-MM-DD');
      query += `&returnDate=${date}`;
    }
    if (searchFlightDto.stops) {
      query += `&stops=${searchFlightDto.stops}`;
    }
    if (searchFlightDto.adults) {
      query += `&adults=${searchFlightDto.adults}`;
    }
    if (searchFlightDto.children) {
      query += `&children=${searchFlightDto.children}`;
    }
    if (searchFlightDto.infants) {
      query += `&infants=${searchFlightDto.infants}`;
    }
    if (searchFlightDto.class) {
      query += `&cabinClass=${searchFlightDto.class}`;
    }
    if (searchFlightDto.currency) {
      query += `&currency=${searchFlightDto.currency}`;
    }

    return query;
  }
}
