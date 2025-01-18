import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const airportMicroService = app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: 'app',
      port: 3001,
      inheritAppConfig: true,
    },
  });

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Flight Scrapper Sample App')
    .setDescription('Sample App for Flight Scrapper')
    .setVersion('1.0')
    .addTag('flight')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
