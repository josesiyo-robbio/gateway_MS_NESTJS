


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { CustomExceptionFilter } from './common';


async function bootstrap() 
{
  const logger = new Logger('Main-Gateway');

  console.log("HOLA MUNDO");
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  
  app.useGlobalPipes
  (
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, })
  );
  

  app.useGlobalFilters(new CustomExceptionFilter());
  
  await app.listen(envs.port);


  logger.log(`Gateway running on port ${envs.port}`);
}
bootstrap();
