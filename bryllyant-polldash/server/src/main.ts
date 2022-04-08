require('dotenv').config()

import { NestFactory, HttpAdapterHost } from '@nestjs/core'

import { AppModule } from './app.module'
import { SeedService } from './common/providers/seed.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  app.enableCors({
    origin: 'http://localhost:3001',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders:
      'Content-Type,Accept,Access-Control-Allow-Credentials,X-Requested-With,Authorization',
  })
  await app.listen(process.env.PORT)
  await SeedService.seedAdmin()
}
bootstrap()
