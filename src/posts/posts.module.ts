import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { PostsController } from './posts.controller';
import { Posts } from './posts.entity';
import { PostsService } from './posts.service';

@Module({
  providers: [PostsService,JwtStrategy],
  imports: [TypeOrmModule.forFeature([Posts])],
  controllers: [PostsController],
})
export class PostsModule {}
