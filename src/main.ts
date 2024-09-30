// src/main.ts
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('VR Store API')  // Título da documentação
    .setDescription('API para gerenciamento de produtos, lojas e preços') // Descrição da API
    .setVersion('1.0') // Versão da API
    .addTag('products') // Exemplo de tag para organizar endpoints
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // Define a rota da documentação
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
