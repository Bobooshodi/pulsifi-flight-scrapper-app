import { Module } from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightController } from './flight.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AIRPORT_MICROSERVICE',
        transport: Transport.TCP,
        options: { host: 'app', port: 3001 },
      },
    ]),
    HttpModule,
  ],
  controllers: [FlightController],
  providers: [FlightService],
})
export class FlightModule {}
