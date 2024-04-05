import { DocumentBuilder } from "@nestjs/swagger"

export const documentConfig = new DocumentBuilder()
  .setTitle("Open Vessel")
  .setDescription("Open Vessel API Documentation")
  .setVersion("1.0")
  .addServer("http://127.0.0.1:4000", "Localhost")
  .addTag("Auth")
  .addTag("Posts")
  .build()
