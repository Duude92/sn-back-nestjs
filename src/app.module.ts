import { ProfileModule } from './profile/profile.module';
import { ContentModule } from './content/content.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    ProfileModule,
    ContentModule,
    AuthModule,
    PostsModule,
    
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: '../app.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
  ],
  providers: [],
})
export class AppModule {}
