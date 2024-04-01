import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from './app.controller';
import { PublicModule } from './public/public.module';
import { PrivateModule } from './private/private.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PublicModule,
    PrivateModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}



