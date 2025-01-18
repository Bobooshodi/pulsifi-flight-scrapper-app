import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const airportMicroService = app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: 3001,
      inheritAppConfig: true,
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
