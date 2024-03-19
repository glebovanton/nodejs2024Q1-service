import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 4000;
  const swaggerPath = 'doc';

  app.useGlobalPipes(new ValidationPipe());

  const swaggerDoc = yaml.load(
    readFileSync('doc/api.yaml', { encoding: 'utf-8' }),
  );

  SwaggerModule.setup(swaggerPath, app, swaggerDoc);

  await app.listen(port).then(() => {
    console.log(`App listening on the http://localhost:${port}/`);
    console.log(
      `Swagger works on the http://localhost:${port}/${swaggerPath}/`,
    );
  });
}
bootstrap();
