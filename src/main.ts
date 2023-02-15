import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('src/secrets/localhost.decrypted.key'),
    cert: fs.readFileSync('src/secrets/localhost.crt'),
  };
  const app = await NestFactory.create(AppModule, {httpsOptions});
  app.enableCors();
  await app.listen(process.env.port || 7216);
}
bootstrap();
