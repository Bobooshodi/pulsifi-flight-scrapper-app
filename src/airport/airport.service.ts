import { Injectable, Logger } from '@nestjs/common';
import { Airport } from './entities/airport.entity';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class AirportService {
  private readonly logger = new Logger(AirportService.name);
  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  path = 'flights/airports';
  baseUrl = this.configService.get('RAPID_API_HOST');

  async findAll(): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService
          .get(`https://${this.baseUrl}/${this.path}`, {
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
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async findOne(query: string): Promise<Airport> {
    try {
      const response = await firstValueFrom(
        this.httpService
          .get(`https://${this.baseUrl}/${this.path}`, {
            data: query,
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
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
