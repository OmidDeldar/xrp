import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import {
  Logger as NestLogger, ValidationPipe
} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const nestLogger = new NestLogger('Main_Logger');
  const config = new DocumentBuilder()
  .setTitle('ripple documentation')
  .setVersion('1.0')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

await app.listen(4000).then(async () => {
  nestLogger.log(`Running`, 'Swagger');
  nestLogger.log(`http://127.0.0.1:${4000}/api`, 'Running Swagger');
});
}
bootstrap();
