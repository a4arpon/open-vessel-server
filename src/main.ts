import fastifyCompress from "@fastify/compress"
import fastifyCors from "@fastify/cors"
import fastifyRateLimit from "@fastify/rate-limit"
import { VersioningType } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { FastifyAdapter, type NestFastifyApplication, } from "@nestjs/platform-fastify"

import { AppModule } from "./modules/app.module"

type Logger = {
  transport: {
    target: string
  }
}
let logger: Logger | boolean = true
if (process.env.ENV === "DEV") {
  logger = {
    transport: {
      target: "@fastify/one-line-logger",
    },
  }
}

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: logger,
    })
  )

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: "1",
  })

  await app.register(fastifyCors, {
    credentials: true,
    origin: "*",
    strictPreflight: true,
  })
  // await app.register(fastifyHelmet, {
  //   xXssProtection: true,
  //   noSniff: true,
  //   crossOriginEmbedderPolicy: true,
  //   contentSecurityPolicy: true,
  //   crossOriginOpenerPolicy: true,
  //   xFrameOptions: {
  //     action: "deny",
  //   },
  //   xDownloadOptions: true,
  //   hidePoweredBy: true,
  // })
  await app.register(fastifyCompress, {
    encodings: ["gzip", "deflate"],
  })
  await app.register(fastifyRateLimit, {
    max: 100,
    timeWindow: "1 minute",
  })

  await app.listen(process.env.PORT ?? "4001", '0.0.0.0')
}
bootstrap()