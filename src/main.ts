import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger 설정 시작
  const config = new DocumentBuilder()
    .setTitle('Blackwind Portal API')
    .setDescription('API 문서 설명')
    .setVersion('1.0')
    .addTag('auth')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  // Swagger 설정 종료

  await app.listen(3000);
}
bootstrap();
