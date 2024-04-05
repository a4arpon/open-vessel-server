import fastifyCompress from "@fastify/compress"
import fastifyCors from "@fastify/cors"
import fastifyHelmet from "@fastify/helmet"
import fastifyRateLimit from "@fastify/rate-limit"
import { VersioningType } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import {
  FastifyAdapter,
  type NestFastifyApplication,
} from "@nestjs/platform-fastify"
import { SwaggerModule } from "@nestjs/swagger"
import { documentConfig } from "./docs/swaggerDocs"
import { AppModule } from "./modules/app.module"

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
      // logger: {
      //   transport: {
      //     target: "@fastify/one-line-logger",
      //   },
      // },
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
    hidePoweredBy: true,
  })
  await app.register(fastifyCompress, {
    encodings: ["gzip", "deflate"],
  })
  await app.register(fastifyRateLimit, {
    max: 100,
    timeWindow: "1 minute",
  })

  SwaggerModule.setup(
    "docs",
    app,
    SwaggerModule.createDocument(app, documentConfig)
  )

  await app.listen(process.env.PORT ?? "4001")
}
bootstrap()
