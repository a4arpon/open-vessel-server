import {Module} from "@nestjs/common"
import {ConfigModule} from "@nestjs/config"
import {AppController} from "./app.controller"
import {AuthController} from "./auth/auth.controller"
import {RouterModule} from "@nestjs/core"
import {AuthService} from "./auth/auth.service"
import {PostsModule} from "./posts/posts.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PostsModule,
    RouterModule.register([
      {
        path: "posts",
        module: PostsModule,
      },
    ]),
  ],
  controllers: [AppController, AuthController],
  providers: [AuthService],
})
export class AppModule {}
