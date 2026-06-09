import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS permitiendo el origen del frontend
  app.enableCors({
    origin: 'http://localhost:4200', // El origen de tu Angular
    methods: 'GET,POST,PUT,DELETE,PATCH',
    credentials: true,
  });

  await app.listen(3000); // Asegúrate de que el puerto sea el correcto
}
bootstrap();
