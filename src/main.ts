import fastifyCompress from "@fastify/compress"
import fastifyCors from "@fastify/cors"
import fastifyHelmet from "@fastify/helmet"
import fastifyRateLimit from "@fastify/rate-limit"
import { NestFactory } from "@nestjs/core"
import {
  FastifyAdapter,
  type NestFastifyApplication,
} from "@nestjs/platform-fastify"
import { AppModule } from "./modules/app.module"

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: {
        transport: {
          target: "@fastify/one-line-logger",
        },
      },
    })
  )

  await app.register(fastifyCors, {
    credentials: true,
    origin: "*",
  })
  await app.register(fastifyHelmet, {
    xXssProtection: true,
    noSniff: true,
    crossOriginEmbedderPolicy: true,
    contentSecurityPolicy: true,
    crossOriginOpenerPolicy: true,
    xFrameOptions: {
      action: "deny",
    },
    xDownloadOptions: true,
  })
  await app.register(fastifyCompress, {
    encodings: ["gzip", "deflate"],
  })
  await app.register(fastifyRateLimit, {
    max: 100,
    timeWindow: "1 minute",
  })

  await app.listen(process.env.PORT ?? "4001")
}
bootstrap()
